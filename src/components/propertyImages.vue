<template>
    <div id="propertyImagesContainer">
        <div id="imageButtonWrapper">
            <div id="buttons">
                <button id="propertyImagesBackButton" @click="back()">Back</button>
                  <button id="propertyImagesNextButton" @click="next()">Next</button>
 
            </div>
       </div>
  <img  id="activePropertyImage" :src="activeImageLink" alt="Unloaded Property Image">


    </div>
</template>
<script>
export default {
    data() {
        return {
            activeImg: 0,
        }
    },
    props: [
        'propImages'
    ],
    computed: {
        totalImgs() {
            return this.propImages.length
        },
        activeImageLink() {
            return this.propImages[this.activeImg]["href"]
        }
    },
    methods: {
        back() {
            if (this.activeImg !== 0) {
                this.activeImg--
            }
        },
        next() {
            if (this.activeImg < this.totalImgs) {
                this.activeImg++
            }
        }
    }
}
</script>
<style>
#buttons {
    display: flex;

    justify-content: space-between;
}
div#propertyImagesContainer {
    max-height: max-content;
    position: relative;
}
button#propertyImagesNextButton {
 
    color: white;
    background: #2b2b2b;
    font-size: .4rem;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
}

button#propertyImagesBackButton {

    color: white;
    background: #2b2b2b;
    font-size: .4rem;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;

}
#buttons{
    display: flex;
    flex-basis: auto;
}
div#imageButtonWrapper {
    display: inline;
    position: absolute;
    top: 50%;
    width: 100%;
}
</style>