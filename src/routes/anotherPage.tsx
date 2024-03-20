import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { DefaultLoader } from "../loaders/defaultLoader";

export default function AnotherPage() {
    const loadedData = useLoaderData() as DefaultLoader;
    const { state } = useNavigation();
    const navigate = useNavigate();
    return (
        <>
            <div>
                <h1>Another Page</h1>
                <p>We can also get the data {loadedData.name}</p>
                {state === "loading" ? <p>Loading</p> : <p>Not Loading</p>}
                <button onClick={() => { navigate(-1) }}>Back Button</button>
            </div>
        </>
    );
}