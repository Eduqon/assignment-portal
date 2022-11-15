import { NavbarHome } from '../components/home_components/navbar_home.js';
import { FormHome } from '../components/home_components/form_home.js';
import { FeaturesHome } from '../components/home_components/features_home.js';
import { FooterHome } from '../components/home_components/footer_home.js';
import AnonymousChat from '../components/chat_components/anonymous_chat.js';

function Home() {
  return (
    <>
      <NavbarHome />
      <FormHome />
      <FeaturesHome />
      <FooterHome />
      <AnonymousChat />
    </>
  );
}

export default Home;
