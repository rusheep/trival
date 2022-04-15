<template>
  <div class="main-page">
    <div class="page-header">
      <h1>高雄旅遊資訊</h1>
      <div class="select">
        <select class="selection" name="" id="" v-model="currentLoctation">
          <option value="">--全部--</option>
          <option :value="item" v-for="item in locations">{{ item }}</option>
        </select>
      </div>
    </div>
    <section class="search">
      <div class="search-warp">
        <div class="search-title"> 
          <h4>熱門行政區</h4>
        </div>
        <div class="btn-wrap">
          <button class="btn" @click="currentLoctation = '三民區'">三民區</button>
          <button class="btn" @click="currentLoctation = '美濃區'">美濃區</button>
          <button class="btn" @click="currentLoctation = '大樹區'">大樹區</button>
          <button class="btn" @click="currentLoctation = '小港區'">小港區</button>
          <button class="btn" @click="currentLoctation = '六龜區'">六龜區</button>
        </div>
      </div>
    </section>
    <div class="page-body">
      <div class="card-wrap">
        <div class="card" v-for="(item, index) in filterData[currentPage]" :key=index>
          <div class="card-header"
          :style="{backgroundImage: `url(${ item.Picture1 })`}"
          v-if="index < 10" 
          >
          </div>
          <div class="card-body">
            <ul class="card-list">
              <li class="card-list-item">
                <div class="icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="card-list-item-detail">
                  {{ item.Opentime }}
                </div>
              </li>

              <li class="card-list-item">
                <div class="icon">
                  <i class="fas fa-map-marker"></i>
                </div>
                <div class="card-list-item-detail">
                  {{ item.Add }}
                </div>
              </li>

              <li class="card-list-item">
                <div class="icon">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <div class="card-list-item-detail">
                  {{ item.Tel }}
                </div>
              </li>

              <li class="card-list-item" v-if="item.Ticketinfo">
                <div class="icon">
                  <i class="fas fa-ticket-alt"></i>
                </div>
                <div class="card-list-item-detail">
                  {{ item.Ticketinfo }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="page">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </a>
        </li>
        <li class="page-item" :class="{active: currentPage === page - 1}" v-for="page in filterData.length">
          <a class="page-link" href="#" @click.prevent="currentPage = page - 1">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
    
    <div class="page-footer">
      <div>高雄旅遊網</div>
      <div>資料來源：高雄市政府</div>
    </div>
  </div>
</template>

<script>
import Pages from './Pages.vue';

export default {
  components: {
    Pages,
  },
  data () {
    return {
      text: '小肥羊',
      data:[],
      currentPage: 0,
      locations: [],
      currentLoctation: '',
    }
  },
  methods: {
    getUniqueList() {
      const locations = new Set();
      const vm = this;
      vm.data.forEach((item, i) => {
        locations.add(item.Zone)
      })
      console.log(locations);
      vm.locations = Array.from(locations);
    }
  },
  computed: {
    filterData() {
      const vm = this;
      //先過濾
      let items = [];
      if (vm.currentLoctation !== '') {
        items = vm.data.filter((item, i) => {
          return item.Zone == vm.currentLoctation;
        })
      } else {
        items = vm.data;
      }
      console.log(vm.currentLoctation);
      //在做分頁
      const newData = [];
      items.forEach((item, index) => {
        if (index % 10 ===0) {
          newData.push([]);
        }
        const page = parseInt(index / 10);
        newData[page].push(item);
      });
      vm.pages = newData.length;
      vm.currentPage = 0
      return newData;
    }
  },
  created() {
    const vm = this;
    const api = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
    this.$http.get(api).then((response) => {
      console.log(response.data);
      vm.data = response.data.result.records;
      vm.getUniqueList();
      console.log(vm.data);
    })
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scpoed>
@import "../assets/scss/main.scss";

h1 {
  color: $main-green;
}

h4 {
  color: $main-green;
}

.main-page {
  height: 100vh;
  background-color: $main-purple;
}

.page-header {
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/images/bg-img2.jpeg);
  background-size: cover;
  background-position: center bottom;
}

.page-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.select {
  width: 25%;
  height: 25%;
}

.selection {
  width: 100%;
  height: 50%;
  color: white;
  background-color: $light-purple;
}

.search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
}

.search-warp  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}

.search-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn  {
  background-color: $main-green;
  color: black;
  border: none;
  padding: 15px 30px;
  margin: 1%;
  border-radius: 8px;
  font-size: 16px;
}

.btn:hover {
  background-color: $deep-green;
}

.page-body {
  background-color: $main-purple;
}

.card-wrap {
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}


.card {
  width: 35%;
  margin: 3%;
  border: 1px inset $deep-purple;
  background-color: $mid-purple;
}

.card-header {
  height: 155px;
  background-size: cover;
}


.card-list-item {
  display: flex;
  justify-content: start;
  align-items: flex-start;
  .card-list-item-detail {
    color: $main-green;
  }
  .icon {
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2%;
    color: $main-green;
  }
}

.page {
  background-color: $main-purple;
}

.pagination {
  display: flex;
  justify-content: center;
}

.page-item {
  margin: 1%;
  padding: 1%;
  background-color: $main-green;
  border: 1px solid $main-green;
  border-radius: 30px;
  list-style: none;
}

.active {
  background-color: $deep-green;
  }

.page-link {
  color: $main-purple;
  text-decoration: none;
}

.page-icon {
  width: 50px;
  color: $main-purple;
}

.page-footer {
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: $main-green;
}

</style>