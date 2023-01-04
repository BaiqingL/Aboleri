import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { useNavigate } from "react-router-dom";
import env from "ts-react-dotenv";
interface Props {
    token: string;
}
  
const Callback: React.FC<Props> = (props: Props) => {
    const { token } = props;
    const searchParams = new URLSearchParams(token);
    const code = searchParams.get('code');
    var accessToken = '';
    // Create the POST request to get the access token
    const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/callback',
    };
    const body = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
        if (value){
            body.append(key, value);
        }
    }
    console.log(body.toString());
    const request = new Request('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(env.CLIENT_ID + ':' + env.CLIENT_SECRET),
        },
        body: body,
    });
    // Send the POST request
    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            accessToken = data.access_token;
        });
    // Navigate to Home with the code
    // https://github.com/react-navigation/react-navigation/issues/10803
    // Redirect to Home
    const navigate = useNavigate();
    setTimeout(() => navigate('/home', { state: { accessToken } }), 50);
    console.log("Navigating to Home...");
    return <div>Loading... if the app doesn't work please reload</div>;

};
  
export default Callback;