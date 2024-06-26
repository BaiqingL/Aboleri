import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import { ProgressStepper, ProgressStep, ProgressStepProps, Button } from '@patternfly/react-core';

async function getName(API: SpotifyWebApi.SpotifyWebApiJs) {
  const data = await API.getMe();
  return data.display_name;
}

async function getUserID(API: SpotifyWebApi.SpotifyWebApiJs) {
  const data = await API.getMe();
  return data.id;
}

async function getLikedSongs(API: SpotifyWebApi.SpotifyWebApiJs) {
  // Create a list called liked songs, then call the getMySavedTracks with a limit of 50 and initial offset of 0
  // Then loop through the list and add the items to the liked songs list, then call the getMySavedTracks again with a limit of 50 and offset of 50
  // Do this until the returned number of elements is smaller than 50
  // Create list as an array of UsersSavedTracksResponse
  var likedSongs: SpotifyApi.SavedTrackObject[] = [];
  var offset = 0;
  var limit = 50;
  var data = await API.getMySavedTracks({limit: limit, offset: offset});
  while (data.items.length === limit) {
    likedSongs = likedSongs.concat(data.items);
    offset += limit;
    data = await API.getMySavedTracks({limit: limit, offset: offset});
  }
  likedSongs = likedSongs.concat(data.items);
  return likedSongs;
}

async function getLikedAlbums(API: SpotifyWebApi.SpotifyWebApiJs) {
  var likedAlbums: SpotifyApi.SavedAlbumObject[] = [];
  var offset = 0;
  var limit = 50;
  var data = await API.getMySavedAlbums({limit: limit, offset: offset});
  while (data.items.length === limit) {
    likedAlbums = likedAlbums.concat(data.items);
    offset += limit;
    data = await API.getMySavedAlbums({limit: limit, offset: offset});
  }
  likedAlbums = likedAlbums.concat(data.items);
  return likedAlbums;
}

async function getMyPlaylists(API: SpotifyWebApi.SpotifyWebApiJs) {
  var myPlaylists: SpotifyApi.PlaylistObjectSimplified[] = [];
  var offset = 0;
  var limit = 10;
  var userID = await getUserID(API);
  var data = await API.getUserPlaylists(userID, {limit: limit, offset: offset});
  while (data.items.length === limit) {
    myPlaylists = myPlaylists.concat(data.items);
    offset += limit;
    data = await API.getUserPlaylists(userID, {limit: limit, offset: offset});
  }
  myPlaylists = myPlaylists.concat(data.items);
  // Get the tracks for each playlist
  var myPlaylistTracks: SpotifyApi.PlaylistTrackObject[] = [];
  myPlaylists.forEach((playlist) => {
    API.getPlaylistTracks(playlist.id).then((data) => {
      myPlaylistTracks = myPlaylistTracks.concat(data.items);
    });
  }
  );
  return myPlaylistTracks;
}

const Home: React.FC = () => {
  const [profile, setProfile] = useState('');
  const [firstStepState, setFirstStepState] = useState("info" as ProgressStepProps['variant']);
  const [secondStepState, setSecondStepState] = useState("pending" as ProgressStepProps['variant']);
  const [thirdStepState, setThirdStepState] = useState("pending" as ProgressStepProps['variant']);
  const [kanyeFound, setKanyeFound] = useState(0);
  const [showDeleteButton, setShowDeleteButton] = useState(true);
  const location = useLocation();
  const accessToken = location.state?.accessToken;
  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);

  const incrementKanyeFound = () => {
    setKanyeFound(kanyeFound => kanyeFound + 1);
  }

  const confirmAndStart = () => {
    setShowDeleteButton(false);
    setFirstStepState("success");
    setSecondStepState("info");
    // First get liked songs
    getLikedSongs(spotifyApi).then((data) => {
        if (data) {
            // Filter the songs if Kanye West, KIDS SEE GHOSTS, or Sunday Service Choir exist in the artist list at all
            var kanyeSongs = data.filter((item) => item.track.artists.some((artist) => artist.name === "Kanye West" || artist.name === "KIDS SEE GHOSTS" || artist.name === "Sunday Service Choir"));
            kanyeSongs.forEach((item) => {
                spotifyApi.removeFromMySavedTracks([item.track.id]).then(() => {
                    incrementKanyeFound();
                });
            });
        }
        // Then get liked albums
        getLikedAlbums(spotifyApi).then((data) => {
            if (data) {
                // Filter the albums if Kanye West or Sunday Service Choice exist in the artist list at all
                var kanyeAlbums = data.filter((item) => item.album.artists.some((artist) => artist.name === "Kanye West" || artist.name === "Sunday Service Choir"));
                kanyeAlbums.forEach((item) => {
                    spotifyApi.removeFromMySavedAlbums([item.album.id]).then(() => {
                        incrementKanyeFound();
                    });
                });
            }
            // Then get playlists
            
        });
        setSecondStepState("success");
        setThirdStepState("success");
      }
    );
  }

  useEffect(() => {
    getName(spotifyApi).then((data) => {
        if (data) {
            setProfile(data);
        }
    });
  }, []);

  return (
    <div className="Center">
      <p>Hello, {profile}</p>
      <br />
      { showDeleteButton && 
        <Button onClick={() => confirmAndStart()} variant="secondary" isDanger >
          Delete Kanye?
        </Button>
      }
      { !showDeleteButton &&
        <p>Deleted {kanyeFound} track(s) and album(s).</p>
      }
      <br />
      <React.Fragment>
      <br />
      <ProgressStepper  isCenterAligned>
        <ProgressStep
          variant= {firstStepState} 
          isCurrent= {firstStepState === "info"}
          description="Waiting confirmation."
          id="basic-alignment-step1"
          titleId="basic-alignment-step1-title"
          aria-label="completed step, step with success"
        >
          First Step
        </ProgressStep>
        <ProgressStep
          variant= {secondStepState} 
          isCurrent= {secondStepState === "info"}
          description="Finding and removing music related to Kanye West (e.g. solo work, KIDS SEE GHOSTS, Sunday Service Choir)."
          id="basic-alignment-step2"
          titleId="basic-alignment-step2-title"
          aria-label="step with info"
        >
          Second Step
        </ProgressStep>
        <ProgressStep
          variant= {thirdStepState} 
          isCurrent= {thirdStepState === "info"}
          description="Enjoy Kanye free Spotify!"
          id="basic-alignment-step3"
          titleId="basic-alignment-step3-title"
          aria-label="pending step"
        >
          Third Step
        </ProgressStep>
      </ProgressStepper>
    </React.Fragment>
    </div>
  );
};

export default Home;
