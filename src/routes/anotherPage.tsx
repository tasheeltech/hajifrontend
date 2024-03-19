import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { Hello } from "./root";

export default function AnotherPage() {
    const loadedData = useLoaderData() as Hello;
    const { state } = useNavigation();
    const navigate = useNavigate();
    return (
        <>
            <div>
                <h1>Another Page</h1>
                <p>We can also get the data {loadedData.hello}</p>
                {state === "loading" ? <p>Loading</p> : <p>Not Loading</p>}
                <button onClick={() => { navigate(-1) }}>Back Button</button>
            </div>
        </>
    );
}