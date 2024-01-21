import React from "react";
import SkillCard from "../components/skillCard/skillCard";
import skills from "../data/skills.json";

const SkillBuild = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl px-4 py-10 mx-auto">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
};

export default SkillBuild;
