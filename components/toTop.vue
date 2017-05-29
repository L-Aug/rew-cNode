<template>
	<div class="toTop" @click="toTop" v-show="show">
		<mu-icon value="home"/>
	</div>
</template>

<script>
  	export default {
    	name: 'toTop',
    	props:['page'],
    	components: {
    	},
    	filters :{
    		
    	},
    	data () {
	      	return {
	      		show:false,
	      		target:null
	      	}
    	},
	    mounted () {
	    	if(this.page=='list'){
	    		this.target='.demo-infinite-container';
	    	}else{
	    		this.target=window
	    	}
            $(this.target).on('scroll', () => {
                if ($(this.target).scrollTop() > 200) {
                    this.show = true;
                } else {
                    this.show = false;
                }
            });
	    },
	    methods:{
			toTop(){
				$(this.target).scrollTop(0);
				this.show = false;
				return false;
			}
	    }
  	}
</script>

<style scoped lang="scss">
	.toTop{
		width: 50px;
		height: 50px;
		background: rgb(87, 194, 151);
		position: fixed;
		bottom: 40px;
		right: 40px;
		border-radius: 100%;
		color: #fff;
		text-align: center;
		line-height: 78px;
		z-index: 5555;
		.mu-icon{
			font-size: 40px;
		}
	}

</style>

