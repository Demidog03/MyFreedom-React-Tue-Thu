import { ComponentType, Suspense } from "react"
import BackdropSpinner from "../../BackdropSpinner"

// Record<string, any> - Любой обьект без лимитов

// props = {
//     loading: true
// }

const Loadable = (Component: ComponentType) => (props: Record<string, any>) => {
    return (
        <Suspense fallback={<BackdropSpinner open={true}/>}>
            <Component {...props} /> {/* <HomePage/> */}
        </Suspense>
    )
}

export default Loadable