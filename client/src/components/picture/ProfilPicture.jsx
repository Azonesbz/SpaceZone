export default function ProfilePicture({ src }) {
    JSON.stringify(src)
    return <img src={`JSON.stringify(src).jpg`} key={src} alt="Profile Picture" />;
  }