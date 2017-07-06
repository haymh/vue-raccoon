<template>
  <div id="profile">
    <v-container fluid>
      <v-layout>
        <v-flex xs7>
          <v-layout row wrap>
            <v-card class="cyan darken-2 white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs5>
                    <v-card-media src="https://photos.zillowstatic.com/h_g/IS56ok2t3lllk60000000000.jpg" height="125px" contain></v-card-media>
                  </v-flex>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Supermodel</div>
                      <div>Foster the People</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-layout>
        </v-flex>
        <v-flex xs5>
          test
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Agent',
};
</script>
