"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";

import { ChallengeCreate } from "@/app/admin/_components/challenge/create";
import { ChallengeEdit } from "@/app/admin/_components/challenge/edit";
import { ChallengeList } from "@/app/admin/_components/challenge/list";
import { ChallengeOptionCreate } from "@/app/admin/_components/challengeOption/create";
import { ChallengeOptionEdit } from "@/app/admin/_components/challengeOption/edit";
import { ChallengeOptionList } from "@/app/admin/_components/challengeOption/list";
import { CourseCreate } from "@/app/admin/_components/course/create";
import { CourseEdit } from "@/app/admin/_components/course/edit";
import { CourseList } from "@/app/admin/_components/course/list";
import { LessonCreate } from "@/app/admin/_components/lesson/create";
import { LessonEdit } from "@/app/admin/_components/lesson/edit";
import { LessonList } from "@/app/admin/_components/lesson/list";
import { UnitCreate } from "@/app/admin/_components/unit/create";
import { UnitEdit } from "@/app/admin/_components/unit/edit";
import { UnitList } from "@/app/admin/_components/unit/list";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
      />

      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
      />

      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
      />

      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
      />

      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation="title"
        options={{
          label: "Challenge Options",
        }}
      />
    </Admin>
  );
};

export { App };
