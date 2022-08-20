AFRAME.registerComponent("create-markers", {
  init: async function(){
    
    var mainScene = document.querySelector("#main.scene");

    // get the dishes collection from firestore database

    var dishes = await this.getDishes();
    
    dishes.map(dish=>{
      var marker = document.createElement("a-marker");
      marker.setAttribute("id", dish.id);
      marker.setAttribute("type"," pattern");
      marker.setAttribute("url", dish.marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin:"mouse"
      });

      // set the markerhandler component
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);

      // adding 3D model to scene

      var model = document.createElement("a-entity");

      model.setAttribute("id", ` model-${dish.id} `);
      model.setAttribute("position", dish.model_geometry.position);
      model.setAttribute("rotation", dish.model_geometry.rotation);
      model.setAttribute("scale", dish.model_geometry.scale);
      model.setAttribute("gltf-model", `url(${dish.model_url})`);
      model.setAttribute("gesture-handler", {});
      marker.appendChild(model);

      //Ingredients Container

     var mainPlane = document.createElementNS("a-plane");
     mainPlane.setAttribute("id", `mainPlane-${dish.id}`);
     mainPlane.setAttribute("position", {x:0, y:0, z:0});
     mainPlane.setAttribute("rotation", {x:-90, y:0, z:0})
     mainPlane.setAttribute("width", 1.7);
     mainPlane.setAttribute("height", 1.5);

     marker.appendChild(mainPlane);

     //Dish title background plane

    var titlePlane =document.createElement("a-plane");
    titlePlane.setAttribute("id", `titlePlane-${dish.id}`);
    titlePlane.setAttribute("position", {x:0, y:0.89, z:0.02});
    titlePlane.setAttribute("rotation", {x:0, y:0, z:0})
    titlePlane.setAttribute("width", 1.69);
    titlePlane.setAttribute("height", 0.3);
    titlePlane.setAttribute("material", {color:"#f0c30f"});

    mainPlane.appendChild(titlePlane);

    })
   
  }
 
 


  
  });
