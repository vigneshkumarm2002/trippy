import styled from 'styled-components';
import Logo from "./../assets/Trippy.png"
import Avatar from "./../assets/profile-picture.jpg"
import aeroSvg from "./../assets/aero.svg"

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
const AeroSvg =styled.img`
width:300px;
position:absolute;
top:35%;
left:0;
@media only screen and (max-width: 1000px) {
  width:300px;
  top:40%;
}
@media only screen and (max-width: 800px) {
  width:300px;
  top:44%;
}
@media only screen and (max-width: 700px) {
  width:250px;
  top:38%;
}
@media only screen and (max-width: 520px) {
  width:200px;
  top:32%;
  left:-50px;
}
@media only screen and (max-width: 335px) {
  top:35%;
  left:-80px;
}
`


const YourComponent = () => {
  return (
    <Header>
      <LogoImage src={Logo} alt="logo" />
      <ProfileContainer onClick={() => alert("Under Development")}>
        <ProfileImage src={Avatar} alt="profile" />
      </ProfileContainer>
      <AeroSvg src={aeroSvg} alt='illustration' />
    </Header>
  );
};

export default YourComponent;
