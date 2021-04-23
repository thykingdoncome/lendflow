<template>
  <div class="home-component">
    <div class="cards-container">
      <div class="search-container">
        <Search placeholder="Search by name" v-model="nameSearch" />
        <Search placeholder="Search by tag" v-model="tagSearch" />
      </div>

      <spinner v-if="loading" />
      <!-- STUDENT CARD COMPONENT RENDER WITH PROPS -->
      <StudentCard
        v-for="student in filteredStudents"
        :key="student.id"
        :id="student.id"
        :tags="student.tags"
        :studentImg="student.pic"
        :email="student.email"
        :firstName="student.firstName"
        :lastName="student.lastName"
        :skill="student.skill"
        :company="student.company"
        :testScores="student.grades"
        @tagAdded="addTagToStudent"
      />
      <!-- STUDENT CARD END -->
    </div>
  </div>
</template>

<script>
import { getAllStudents } from "@/API/services/api.students";

import StudentCard from "@/components/StudentCard";
import Search from "@/components/Search";
import Spinner from "../components/Spinner.vue";

export default {
  name: "Home",
  components: {
    StudentCard,
    Search,
    Spinner,
  },
  data() {
    return {
      students: [],
      nameSearch: "",
      tagSearch: "",
      loading: false,
    };
  },
  methods: {
    async fetchStudents() {
      this.loading = true;

      try {
        const res = await getAllStudents();
        this.students = res.data.students;

        // Adding a tags array key to each student Object
        this.students = this.students.map((student) => {
          return { ...student, tags: [] };
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error, "eeerrr");
      }
    },
    addTagToStudent(tagName, studentId) {
      const studentIndex = this.students.findIndex(
        (student) => student.id === studentId
      );
      const theStudent = this.students[studentIndex];
      theStudent.tags.push(tagName);
      this.$set(this.students, studentIndex, theStudent);
    },
  },
  computed: {
    filteredStudents() {
      if (!this.nameSearch && !this.tagSearch) return this.students;
      let nameFilter = this.nameSearch.toLowerCase();
      let tagFilter = this.tagSearch.toLowerCase();

      return this.students.filter((student) => {
        let isNameIncluded = !nameFilter;
        let fullName = `${student.firstName} ${student.lastName}`;
        if (nameFilter) {
          isNameIncluded = fullName.toLowerCase().includes(nameFilter);
          // student.firstName.toLowerCase().includes(nameFilter) ||
          // student.lastName.toLowerCase().includes(nameFilter);
        }

        let isTagIncluded = !tagFilter;
        if (tagFilter) {
          isTagIncluded = student.tags.filter((tag) =>
            tag.toLowerCase().includes(tagFilter)
          ).length;
        }
        return isNameIncluded && isTagIncluded;
      });
    },
  },
  async mounted() {
    await this.fetchStudents();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-component {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.search-container {
  position: sticky;
  top: 0;
  background: var(--white);
  z-index: 1000;
  padding-top: 1rem;
}

.search-container > div {
  margin-bottom: 1rem;
}

.cards-container {
  max-width: 1000px;
  width: 90%;
  padding: 0 1rem;
  margin: 2rem auto;
  height: 700px;
  background: white;
  border-radius: 6px;
  overflow-y: scroll;
  position: relative;
  scroll-behavior: smooth;
  box-shadow: 1px 1px 10px 0 rgb(10 46 101 / 11%), 0 0 0 1px rgb(10 46 101 / 8%);
}

.cards-container::-webkit-scrollbar {
  width: 0.3em;
  border-radius: 0 6px 6px 0;
}

.cards-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: var(--white);
  border-radius: 0 6px 6px 0;
}

.cards-container::-webkit-scrollbar-thumb {
  background-color: var(--focus);
  outline: 1px solid var(--light-gray);
  border-radius: 0 6px 0 0;
}

.spinner-container {
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* z-index: 100; */
  left: 0;
  align-items: center;
  justify-content: center;
}
</style>
