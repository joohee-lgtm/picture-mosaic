
document.addEventListener("DOMContentLoaded", function(){
	var eventTarget = document.querySelectorAll("article#list ul li img");
	new PictureListSlide(eventTarget);
});

function PictureListSlide(target){
	this.photoNodes = target;
	this.createLightBox();
	this.eventHander();
}

PictureListSlide.prototype = {
	eventHander : function(){
		var eventTarget = this.photoNodes[0].parentNode.parentNode;
		var parentNodeTag = this.photoNodes[0].parentNode.tagName.toLowerCase();
		var photoTag = this.photoNodes[0].tagName.toLowerCase();

		eventTarget.addEventListener("click", function(e){
			if(e.target.tagName.toLowerCase() === photoTag){
				this.changeLightBoxVisible();
			}
		}.bind(this));
	},

	changeLightBoxVisible : function(){
		var hide = "hide";
		var show = "show"
		var current = this.lightBox.className===hide?hide:show;
		var toAdd = current===hide?show:hide;
		this.lightBox.classList.remove(current);
		this.lightBox.classList.add(toAdd);
	},

	createLightBox : function(){
		var lightBox = "<article id='lightBox' class='hide'></article>";
		var place = document.querySelector("body");
		place.insertAdjacentHTML("afterbegin", lightBox);
		this.lightBox = place.querySelector("#lightBox");
		this.lightBoxEvent();
	},

	lightBoxEvent : function(){
		var isBoxShow = function(){
			return this.lightBox.classList.contains("show");
		}

		document.addEventListener("scroll", function(e){
			if(isBoxShow){
				e.preventDefault();
			}
		});

		this.lightBox.addEventListener("click", function(){
			if(isBoxShow){
				this.changeLightBoxVisible();
			}
		}.bind(this));
	}

}