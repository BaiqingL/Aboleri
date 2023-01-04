import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import { ProgressStepper, ProgressStep, ProgressStepProps, Button } from '@patternfly/react-core';

async function getName(API: SpotifyWebApi.SpotifyWebApiJs) {
  const data = await API.getMe();
  return data.display_name;
}

async function getLikedSongs(API: SpotifyWebApi.SpotifyWebApiJs) {
  const data = await API.getMySavedTracks();
  return data;
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
    getLikedSongs(spotifyApi).then((data) => {
        if (data) {
            // Filter the songs if Kanye West exist in the artist list at all
            var kanyeSongs = data.items.filter((item) => item.track.artists.some((artist) => artist.name === "Kanye West"));
            kanyeSongs.forEach((item) => {
                spotifyApi.removeFromMySavedTracks([item.track.id]).then(() => {
                    console.log("Removed " + item.track.name);
                    incrementKanyeFound();
                    console.log("kanyeFound" + kanyeFound);
                    // delay the next call to avoid rate limiting
                });
            });
            setSecondStepState("success");
            // Map the songs individually

            setThirdStepState("success");
        }
    }
    );
  }

  useEffect(() => {
    getName(spotifyApi).then((data) => {
        if (data) {
            setProfile(data);
            console.log(data);
        }
    });
  }, []);

  return (
    <div className="Center">
      <p>Hello, {profile}</p>
      <br />
      { showDeleteButton && 
        <Button onClick={() => confirmAndStart()} variant="secondary" isDanger >
          Delete Kanye
        </Button>
      }
      { !showDeleteButton &&
        <p>Deleted {kanyeFound} track(s).</p>
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
          First step
        </ProgressStep>
        <ProgressStep
          variant= {secondStepState} 
          isCurrent= {secondStepState === "info"}
          description="Finding and removing anything that is related to Kanye West."
          id="basic-alignment-step2"
          titleId="basic-alignment-step2-title"
          aria-label="step with info"
        >
          Second step
        </ProgressStep>
        <ProgressStep
          variant= {thirdStepState} 
          isCurrent= {thirdStepState === "info"}
          description="Enjoy Kanye free Spotify."
          id="basic-alignment-step3"
          titleId="basic-alignment-step3-title"
          aria-label="pending step"
        >
          Third step
        </ProgressStep>
      </ProgressStepper>
    </React.Fragment>
    </div>
  );
};

export default Home;