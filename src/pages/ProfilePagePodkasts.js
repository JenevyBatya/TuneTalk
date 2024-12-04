import {
    Black,
    Description, EditButton, EditButtonDiv,
    InfoDiv, Link,
    LinkDiv, LinkLogo,
    MainContainer,
    Pic,
    ProfileContainer,
    Username
} from "../styles/ProfilePagePodkastsStyles";

const ProfilePagePodkasts = () => {
    return (
<MainContainer>
    <ProfileContainer>
        <Pic/>
        <InfoDiv>
            <Username>
                Username
            </Username>
            <Description>
                Description Description Description Description Description
            </Description>
            <LinkDiv>
                <LinkLogo/>
                <Link> vk.com</Link>
            </LinkDiv>
            <EditButtonDiv>
                <Black/>
                <EditButton>изменить профиль</EditButton>
            </EditButtonDiv>

        </InfoDiv>
    </ProfileContainer>
</MainContainer>
    );
};
export default ProfilePagePodkasts;