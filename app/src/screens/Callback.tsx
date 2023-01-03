import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { useNavigate } from "react-router-dom";

interface Props {
    token: string;
}
  
const Callback: React.FC<Props> = (props: Props) => {
    const { token } = props;
    const searchParams = new URLSearchParams(token);
    const code = searchParams.get('code');
    console.log(code);
    // Redirect to Home
    const navigate = useNavigate();
    // Navigate to Home with the code
    // https://github.com/react-navigation/react-navigation/issues/10803
    setTimeout(() => navigate('/home', { state: { code } }), 50);
    console.log("Navigating to Home...");
    return <div>Loading... if the app doesn't work please reload</div>;
};
  
export default Callback;