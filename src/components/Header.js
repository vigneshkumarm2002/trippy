import styled from 'styled-components';
import Logo from "./../assets/Trippy.png"
import Avatar from "./../assets/avatar.jpg"

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;

  @media only screen and (max-width: 520px) {
    width: 100px;
  }
`;

const ProfileContainer = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50px;

  @media only screen and (max-width: 520px) {
    width: 40px;
    height: 40px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;


const YourComponent = () => {
  return (
    <Header>
      <LogoImage src={Logo} alt="logo" />
      <ProfileContainer onClick={() => alert("Under Development")}>
        <ProfileImage src={Avatar} alt="profile" />
      </ProfileContainer>
    </Header>
  );
};

export default YourComponent;
