<template>
  <div>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  </div>
</template>




<style lang="scss" scoped>
@import "../assets/scss/main.scss";

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

.page-link {
  color: $main-purple;
  text-decoration: none;
}

.page-icon {
  width: 50px;
  color: $main-purple;
}
</style>