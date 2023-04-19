import NavBar from './NavBar'
import FilterBar from './FilterBar'

const MainPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <FilterBar />
      <div className='Hero'>
        <div className='InnerHeroDiv'></div>
      </div>
      <h2 className='text-3xl '>Main page content</h2>
    </>
  );
};

export default MainPage;
