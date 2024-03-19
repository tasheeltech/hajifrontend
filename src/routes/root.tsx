import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export interface Hello {
    hello: string
}

export default function Root() {
    const loadedData = useLoaderData() as Hello;
    const navigate = useNavigate();

    return (
        <>
            <div>
                <h1>Sample Home Page</h1>
                <p>{loadedData.hello}</p>
                {/* <Link to={"/anotherPage"} state={{ hi: "I am sent from home page" }}>Go to another Page</Link> */}
                <button onClick={() => { navigate("/anotherPage") }}>Go to another page</button>

            </div>
        </>
    );
}