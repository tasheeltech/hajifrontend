import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserState } from "../helper/userStateHelper";
import { DefaultLoader } from "../loaders/defaultLoader";

export default function Root() {
    const loadedData = useLoaderData() as DefaultLoader;
    const { micPermission, locationPermission, isoLanguage, name, setMicPermission, setLocationPermission, setIsoLanguage, setName, getUserScreen, computeUserScreen } = useUserState(loadedData);
    const navigate = useNavigate();

    return (
        <>
            <div>
                <h1>Sample Home Page</h1>
                <p>{loadedData.name}</p>
                {/* <Link to={"/anotherPage"} state={{ hi: "I am sent from home page" }}>Go to another Page</Link> */}
                <button onClick={() => { navigate("/anotherPage") }}>Go to another page</button>

            </div>
        </>
    );
}