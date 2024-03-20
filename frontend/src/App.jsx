// import { useEffect } from "react";
import { useEffect } from "react";
import "./App.css";
import { apiGetAllSkills, apiGetSkill } from "./services/skills.services";

function App() {
  // const fetchData = async () => {
  //   const skills = await apiGetAllSkills();
  //   console.log(skills.data);
  //   const single_skill = await apiGetSkill("65f87080176aa66e94ca33f9");
  //   console.log(single_skill.data);
  // };

  useEffect(() => {
    (async () => {
      const skills = await apiGetAllSkills();
      console.log(skills.data);
      const single_skill = await apiGetSkill("65f87080176aa66e94ca33f9");
      console.log(single_skill.data);
    })();
  }, []);
  return <></>;
}

export default App;
