import { Container } from "@mui/material"
import EditProfileForm from "../module/profile/ui/EditProfileForm"
import SidebarLayout from "../shared/SidebarLayout"

function EditProfilePage() {
    return (
        <SidebarLayout>
            <Container maxWidth="sm">
                <h1>Edit Profile</h1>
                <EditProfileForm/>
            </Container>
        </SidebarLayout>
    )
}

export default EditProfilePage
