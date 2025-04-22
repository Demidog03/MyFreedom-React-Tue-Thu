import MarketplaceCards from "../components/marketplace-cards/MarketplaceCards"
import MarketplaceNavbar from "../components/marketplace-navbar/MarketplaceNavbar"
import TestComponent from "../components/TestComponent"

function MainPage() {
    return (
        <div>
            <MarketplaceNavbar/>
            <MarketplaceCards/>
            {/* <TestComponent/> */}
        </div>
    )
}

export default MainPage
