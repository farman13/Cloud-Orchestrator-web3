import AddFunds from "../components/AddFunds"
import { DeployOptions } from "../components/DeployOptions"
import { Navbar } from "../components/Navbar"
import ShowBalance from "../components/ShowBalance"


export const LandingPage = () => {
    return (
        <>
            <Navbar />
            <ShowBalance />
            <AddFunds />
            <DeployOptions />
        </>
    )
}
