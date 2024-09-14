import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={css.main_page}>
      <div className={css.container}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>
    </section>
  );
};

export default HomePage;
