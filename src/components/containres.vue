<template>
    <div id="containRES">
      <form id="formWrap">
        <div id="inputWrap">
          <div id="streetInput">
            <!-- <label for="Street">Street: </label> -->
            <input v-model="street" v-validate="'required'" name="Street" type="text"
              placeholder="Street e.x. 123 main st" required />
          </div>
          <div id="zipInput">
            <!-- <label for="Zip">Zip Code: </label> -->
            <input v-model="zip" v-validate="'required'" name="Zip" type="text" placeholder="Zip Code" required />
          </div>
        </div>
        <div id="buttonWrap">
          <button :class="{ disabled: loading }" :disabled="loading || (isDisabled)" @click="submit" class="button-27"
            role="button">
            GO
          </button>
        </div>
      </form>
      <div :class="{ 'dataColumns': !loading && dataAPI !== false, 'dataColumnsAlt': loading || dataAPI == false }">
        <ul id="dataList" v-if="dataAPI !== false && !loading">
          <li class='listItem' :class="
            [
              propertyName.replaceAll(' ', '-'),
              { 'good': propertyName === 'Distance To Coast' && (parseInt(dat) >= 4) },
              { 'bad': propertyName === 'Distance To Coast' && (parseInt(dat) <= 4) },
              { 'good': propertyName === 'Year Built' && (parseInt(dat) >= 2006) },
              { 'bad': propertyName === 'Year Built' && (parseInt(dat) <= 2006) }
            ]" :key="propertyName" v-for="(dat, propertyName) in dataAPIToShow">
            <span class="Label">{{ propertyName }}</span>: {{ dat }}
          </li>
        </ul>
        <span id="dataListAlt" v-else-if="!loading">Please Enter An Address</span>
        <div id="loadingSign" class="center" v-else-if="loading">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        <div id="map" :class="{ 'noDis': typeof dataAPI == Boolean }"></div>
      </div>
    </div>
        
        <div id="containRES">
      <form id="formWrap">
        <div id="inputWrap">
          <div id="streetInput">
            <!-- <label for="Street">Street: </label> -->
            <input v-model="street" v-validate="'required'" name="Street" type="text"
              placeholder="Street e.x. 123 main st" required />
          </div>
          <div id="zipInput">
            <!-- <label for="Zip">Zip Code: </label> -->
            <input v-model="zip" v-validate="'required'" name="Zip" type="text" placeholder="Zip Code" required />
          </div>
        </div>
        <div id="buttonWrap">
          <button :class="{ disabled: loading }" :disabled="loading || (isDisabled)" @click="submit" class="button-27"
            role="button">
            GO
          </button>
        </div>
      </form>
      <div :class="{ 'dataColumns': !loading && dataAPI !== false, 'dataColumnsAlt': loading || dataAPI == false }">
        <ul id="dataList" v-if="dataAPI !== false && !loading">
          <li class='listItem' :class="
            [
              propertyName.replaceAll(' ', '-'),
              { 'good': propertyName === 'Distance To Coast' && (parseInt(dat) >= 4) },
              { 'bad': propertyName === 'Distance To Coast' && (parseInt(dat) <= 4) },
              { 'good': propertyName === 'Year Built' && (parseInt(dat) >= 2006) },
              { 'bad': propertyName === 'Year Built' && (parseInt(dat) <= 2006) }
            ]" :key="propertyName" v-for="(dat, propertyName) in dataAPIToShow">
            <span class="Label">{{ propertyName }}</span>: {{ dat }}
          </li>
        </ul>
        <span id="dataListAlt" v-else-if="!loading">Please Enter An Address</span>
        <div id="loadingSign" class="center" v-else-if="loading">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
        <div id="map" :class="{ 'noDis': typeof dataAPI == Boolean }"></div>
      </div>
    </div>
</template>