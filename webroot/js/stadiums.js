/**
 * @class js/stadiums.js
 *
 * @desc Shows a Map for all the Stadiums that I have been.
 *
 * @author Andrez Ortiz <@a_kanin>
 * 
 * Universidad Politecnica de Durango.
 * Software Engineer
 *
 * @copyright     Copyright October 2013
 * @version       Stadiums v 0.0.1
 */

// Global 
 google.maps.visualRefresh = true;

 var  map,
      m = [],
      map2, 
      center,       
      sv,
      panorama,
      directionsDisplay,
      initialLocation,
      browserSupportFlag,
      directionsService;

/*
 *  @desc Initial function that is called when de DOM is ready
 */
function init(){
  center = new google.maps.LatLng(26.0302955, -105.663329)
  sv = new google.maps.StreetViewService();
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

	// Setting up the map
	var mapOptions = {
    center: center,
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP

  };

  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions );  
  
  directionsDisplay.setPanel(document.getElementById('directions_panel'));

  var control = document.getElementById('control');  
  var home = document.getElementById('home');
  control.style.display = 'block';
  home.style.display = 'block';
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(home);

  // Setting up Markers
  m[0]   = new marker({
    lat     : 25.87100   ,
    lan     : -100.3875999,
    title   : 'Academia de Beisbol. El Carmen NL',
    content : 'La academia de la liga mexicana de beisbol de el Carmen NL. ING. ALEJO PERALTA se inauguró el 25 de marzo de 1996, siendo presidente de la LMB. el Lic. Pedro Treto Cisneros'+
               '<br>La academia tiene sus orígenes en 1981 en el Complejo Industrial Pasteje hoy Ciudad Industrial Alejo Peralta y Diaz Ceballos en el Estado de México. <br> Ahora se le denomina la Universidad del Beisbol a la academia situada en el Carmen NL. Lugar en el que se desarrollan los jugadores de las organizaciones de la LMB. Donde Nacen Las Estrellas. Aquí Tuve participaciónes en 2008',
    img     : 'academia.JPG'
  }),

  m[1]    = new marker({
    lat     : 19.165058  , 
    lan     : -96.122685,  
    title   : 'Beto Ávila. Águilas de Veracruz',     
    img     : 'aguilas.JPG',
    content : 'El Parque Deportivo Universitario "Beto Ávila", es la sede del equipo de béisbol Rojos del Águila de Veracruz que participa en la Liga Mexicana de Béisbol, el cual fue inaugurado con dicho nombre en el mes de marzo de 1992. Dicho inmueble lleva este nombre, como homenaje al más grande beisbolista veracruzano de todos los tiempos. El parque también es llamado coloquialmente como "El Nido del Águila". Durante el invierno, es sede de los Rojos de Veracruz en la Liga Invernal Veracruzana. Aquí Jugué un nacional de Nuevos Valores en 2003'
  }),
  
  m[2]   = new marker({
    lat     : 28.655492  , 
    lan     : -106.08294, 
    title   : 'Estado Manuel L. Almanza',
    img     : 'uachos.jpg',
    content : 'Ubicado dentro de la Cd. Deportiva, ha sido centro de grandes eventos deportivos y artisticos. Artistas de la talla de Juan Gabriel y Pitbull se han presentado en este reciento del estado de Chihuahua. Es la casa del equipo de beisbol Dorados UACH, donde tuve participación en 2009 y 2010'
  }),

  m[3]     = new marker({
    lat     : 33.8001195 ,
    lan     :  -117.883064,  
    title   : 'Anaheim Stadium',
    img     : 'anaheim.JPG',
    content : 'El estadio se construyó entre los años 1964 y 1966, en ese entonces Los Angelinos de California tuvieron que jugar en el estadio de Los Angeles Dodgers el Dodger Stadium. El estadio fue construido en una zona agrícola en la ciudad de Anaheim de aproximadamente 65 km², a finales de los años 1970 el equipo de la ciudad de Los Angeles Rams decidió mudarse al Anaheim Stadium. Lo visité en 2009'
  }),

  m[3]    = new marker({
    lat     : 28.625466  , 
    lan     : -106.021772, 
    title   : 'Monumental Estadio Chihuahua',
    img     : 'monumental.jpg',
    content : ' Es casa de los Dorados de Chihuahua de la Liga Mexicana de Béisbol, así como de los Dorados de la Liga Estatal de Chihuahua, liga amateur de béisbol. También es conocido como Gran Estadio Chihuahua.'+
               '<br>El estadio fue construido en 2004 gracias al programa de apoyo al deporte en el estado impulsado por el entonces gobernador Patricio Martínez García. Lo visité múltiples ocaciones entre 2009 y 2010.' 
  }),

  m[4]     = new marker({
    lat     : 26.940655  , 
    lan     : -105.719172, 
    title   : 'Gran Estadio Parral',
    img     : 'parral.jpg',
    content : 'En parral el deporte que más se practica es el béisbol, que fue traído desde Estados Unidos a finales del siglo XIX a la ciudad. Parral es la ciudad del estado que a lo largo de los años más campeonatos ha logrado conseguir, el último conseguido en Ciudad Juárez, Chihuahua contra el equipo de los Indios en el 2012. De Parral también han salido una gama de peloteros de calidad a lo largo de los años. En el 2002, se construye el "Gran Estadio Parral" el cual es la actual casa de los llamados Mineros o como coloquialmente se les describe "Picapiedra". Jugué en este estadio en 2010'
  }),

  m[5]     = new marker({
    lat     : 19.862795  ,
    lan     :  -90.510908, 
    title   : 'Nelson Barrera Romellon',
    img     : 'campeche.jpg',
    content : 'Es la sede del equipo de béisbol Piratas de Campeche que participa en la Liga Mexicana de Béisbol, anteriormente dicho inmueble llevó el nombre de "Estadio Venustiano Carranza", el cual estuvo cerrado durante un tiempo, en el cual fue objeto de una remodelación completa, de hecho; fue demolido en un 99%. Aqui tuve participación en un nacional de Nuevos Valores en 2006.' 
  }),

  m[6]    = new marker({
    lat     : 25.539981  , 
    lan     : -103.429247,
    title   : 'Estadio Revolución',
    img     : 'vaqueros.jpg',
    content : 'Es casa de los Vaqueros Laguna, equipo de la Liga Mexicana de Béisbol.'+
              '<br>El estadio fue inaugurado en 1932 por el entonces gobernador de Coahuila, Nazario S. Ortiz Garza, celebrando el 25 aniversario de que se le otorgara a Torreón el rango de ciudad. El estadio fue creado para béisbol y contaba con pista de atletismo.'
  }),

  m[7]      = new marker({
    lat     : 29.0635972 , 
    lan     : -111.0501909,
    title   : 'Estadio Sonora',
    img     : 'sonora.JPG',
    content : 'El estadio fue inaugurado el 1 de febrero en la Serie del Caribe 2013. Su capacidad es de 16,000 aficionados.'+
              '<br>Es el nuevo estadio de la novena hermosillense después de mudarse del Estadio Héctor Espino. Dicho inmueble albergó 5 Series del Caribe en 1974, 1982, 1987, 1992 y 1997, además de 9 juegos de exhibición de Major League Baseball. Lo visité en la Serie del Caribe 2013 donde México quedó campeón en un juego muy emocionante de 18 entradas.'
  }),

  m[8]    = new marker({
    lat     : 25.718112  , 
    lan     : -100.315411, 
    title   : 'Manuel L. Barragán',
    img     : 'sultan.jpg',
    content : 'Actualmente es casa de los Sultanes de Monterrey, campeones en 9 ocasiones de la Liga Mexicana de Béisbol. Ha sido también casa de los ahora desaparecidos, Industriales de Monterrey y sede de diversos encuentros de pretemporada y temporada regular de las Grandes Ligas de Béisbol de Estados Unidos. Tuve el honor de jugar con Pancho Campos en un juego de preparación de la Seleccion de México contra la Selección de la Academia en 2008.'
  }),

  m[9]     = new marker({
    lat     : 23.235974  , 
    lan     : -106.432121,
    title   : 'Teodoro Mariscal',
    img     : 'teodoro.jpg',
    content : 'El Estadio Teodoro Mariscal está ubicado en la ciudad de Mazatlán, Sinaloa, México; y es el estadio de los Venados de Mazatlán que participan en la Liga Mexicana del Pacífico; cuenta con capacidad para 12,000 aficionados cómodamente sentados, y tiene en su historia 5 Series del Caribe.'+
               'Es uno de los parques más amplios de toda la liga. Aquí fui a la serie del Caribe 2005. Donde México tambén se coronó campeón.'
  }),

  m[10]      = new marker({
    lat     : 40.829606  ,
    lan     :  -73.926355, 
    title   : 'Yankee Stadium',
    img     : 'yankees.jpg',
    content : 'El Yankee Stadium es la sede de los New York Yankees, equipo de las Grandes Ligas de Béisbol de los Estados Unidos. El recinto, inaugurado en 2009, suplantó al estadio del mismo nombre (1923-2008), anexo al actual edificio. En términos generales, el edificio ostenta similares características al antiguo parque de pelota,2 aunque un 63 por ciento más grande3 y con incorporaciones modernas. Es el inmueble más caro jamás construido en la historia del béisbol;4 y el segundo recinto deportivo, a nivel mundial, detrás del Estadio de Wembley. Lo acabo de visitar en 2013 para despedir a Mariano Rivera.'
  }),

  m[11]      = new marker({
    lat     : 19.302646  , 
    lan     : -99.150474,
    title   : 'Estadio Azteca',
    content : 'El Estadio Azteca es un estadio de fútbol ubicado en la Ciudad de México, perteneciente a la empresa de medios Grupo Televisa. Su capacidad es de 105 064 espectadores,1 2 siendo así el tercer estadio de fútbol más grande del mundo solo después del Estadio Reungrado Primero de Mayo en Corea del Norte y el Salt Lake Stadium en la India. Fue diseñado por los arquitectos Pedro Ramírez Vázquez y Rafael Mijares Alcérreca y se construyó en 1962 con motivo de la novena edición de la Copa Mundial de Fútbol que se realizó en México en 1970.',
    img     : 'azteca.jpg',
    type    : 'fut'
  }),

  m[12]      = new marker({
    lat     : 19.332496  , 
    lan     : -99.191982, 
    title   : 'Estadio Olímpico Universitario',
    content : 'Es un estadio multiusos perteneciente a la Universidad Nacional Autónoma de México, es el segundo estadio más grande de México después del Estadio Azteca en la Ciudad de México, tiene una capacidad de 68 954 espectadores. Fue la principal sede los Juegos Olímpicos de 1968. Actualmente es el escenario como local de Universidad Nacional, club de fútbol de la Primera División de México y de Pumas CU. Lo visité en 1999 con el equipo "Pumitas"',
    img     : 'unam.jpg',
    type    : 'fut'
  }),

  m[13]      = new marker({
    lat     : 19.1636586 , 
    lan     : -96.1220519, 
    title   : 'Luis "Pirata" Fuentes',
    content : 'Es la sede del equipo de fútbol Tiburones Rojos de Veracruz que participa en la Liga Bancomer MX. "El Pirata", como se le conoce a la sede de los Tiburones Rojos de Veracruz, tiene una capacidad para 30.000 aficionados, y fue objeto de una remodelación entre los años 2003 y 2004; y dentro de su renovación se agregaron butacas en todas sus zonas, así como una pantalla gigante. Lo visité en 2003.',
    img     : 'tiburones.jpg',
    type    : 'fut'
  }),

  m[14]      = new marker({
    lat     : 28.7103781 ,
    lan     : -106.1434237,
    title   : 'Estadio Universitario Reyes Baeza Terrazas',
    content : 'El Estadio Olímpico de la Universidad Autónoma de Chihuahua fue inaugurado en mayo de 2007. <br> Actualmente es casa del equipo de fútbol americano Águilas de Chihuahua, así como de los equipos de fútbol Indios de Chihuahua y Dorados Fuerza UACH. Cabe señalar que en el 2007 fue sede del Tazón Azteca y también el primer concierto que se dio en ese estadio fue el de Shakira en su gira Fijación Oral, además fue utilizado en el 2008 para el concierto del grupo de rock Maná en su gira Amar es combatir. Lo visité múltiples ocaciones entre 2009 y 2010.',
    img     : 'aguilasuach.jpg',
    type    : 'nfl'
  });


}
/*
 *  @desc Creates markers
 *  @param object opt - options for the marker
 */
var marker = function (opt){  
  // Default Options
  var options = {
    content : 'Insert a content',
    img     : false,
    lan     : 0,
    lat     : 0,
    title   : 'Insert a title',
    type    : 'beis',
    url     : false
  }
  $.extend(true, options, opt);


  // Call marker
  var me = new google.maps.Marker({
    map       : map,
    animation : google.maps.Animation.DROP,
    position  : new google.maps.LatLng( options.lat, options.lan),
    icon      : './webroot/img/' + options.type + '.png' 
  });

  // Set Marker Events and create infobox
  var ib = createInfoBox(options)
  setClick(me,ib);


  return me;
}
/*
 *  @desc: variable function to create multiple infobox
 *  @param object options
 */
var createInfoBox = function(options){  
  //config HTML
  var html =  '<section class="info_wrapper">'
  html +=   '<div class="title">'+ options.title+'</div>';
  html +=   (options.img)? '<img alt="'+options.title+'" width="90%" src="webroot/img/stadiums/'+ options.img+'">' : '';
  html +=   '<p class="text">' + options.content + '</p>'
  html +=   '<ul class="nav-info">'
  html +=     (options.url)? '<li><a target="_blank" href="./img/webroot/stadiums/'+ options.url +'">Sitio Oficial</a></li>' : '';
  html +=   '</ul>'
  html += '</section>';

  var myOptions = {
           content: html
          ,disableAutoPan: false
          ,maxWidth: 0
          ,pixelOffset: new google.maps.Size(-140, 0)
          ,zIndex: null
          ,boxStyle: {
            opacity: 0.75
            ,width:  "450px"
            ,height: "350px",
            padding: "5px",
            margin: "auto"
          }
          ,closeBoxMargin: "10px"
          ,infoBoxClearance: new google.maps.Size(1, 1)
          ,isHidden: false
          ,pane: "floatPane"
          ,enableEventPropagation: false
  };
  return new InfoBox(myOptions);
}
/*
 * @desc Event listener that manages all changes in the markers
 * @param {object} mark: the marker it self
 * @param {object} ib: the infobox itself
 */
function setClick(mark, ib){
  //Event
  google.maps.event.addListener(mark, 'click', function(e) {
    //Toggle bounce
    if (mark.getAnimation() != null) {      
      mark.setAnimation(null);
      ib.close()   
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);  
      map.setCenter(e.latLng);
      map.setZoom(5)
      map.setCenter(e.latLng)
      if (google.maps.StreetViewStatus.OK == 'OK') {
        toggleStreetView();
      }
    } else {
      mark.setAnimation(google.maps.Animation.BOUNCE);
      ib.open(map, mark);

      //Call street View
      if(!sv.getPanoramaByLocation(e.latLng, 600, processSVData)){
        map.setZoom(18)  
      }else{
        map.setZoom(10);     
      }

      toggleStreetView(); 
      map.setCenter(e.latLng);
      map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      map.setTilt(45);
    }
  });


}
/*
 * @desc Service to load the panorama and street view
 * @param {object} data
 * @param {string} status
 */
function processSVData(data, status) {
  if (status == google.maps.StreetViewStatus.OK) {
     var mapOptions = {
       center: data.location.latLng,
       zoom: 14,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };

     map2 = new google.maps.Map(document.getElementById('map_canvas2'), mapOptions);

     var panoramaOptions = {
       position: data.location.latLng,
       pov: {
         heading: 34,
         pitch: 10
       }
     };

     panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
     map2.setStreetView(panorama);
     panorama.setVisible(true);
     return true;

  }else 
    return false;
}

/*
 * @desc Hide and show street view panel
 */
function toggleStreetView() {
  var pano = $('#pano');
  var canva = $('#map_canvas');
  var canva2 = $('#map_canvas2'); 
  //var pan = panorama.getStreetView()
  //var toggle = pan.getVisible()
  if (pano.css('width') == '0px') {
    pano.fadeIn( 'fast', function() {
        pano.css('width', '50%')
        canva.css('width','50%')
        canva2.css('width','50%');
    });
    //pan.setVisible(true);

  } else {
    pano.fadeOut( 'fast', function() {
         pano.css('width', '0%')         
         canva2.css('width','0%');
         canva.css('width','100%')
    });

    //pan.setVisible(false);
  }
}

function calcRoute() {
  resetMap();
  var start = 'Durango, México';
  var end = document.getElementById('end').value;
  var distance = document.getElementById('distance');
  var canva = $('#map_canvas');
  var dir = $('#directions_panel');

  if (end != '0'){
    directionsDisplay.setMap(map);
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true  
    };
    directionsService.route(request, function(response, status) {
      var distancia = response.routes[0].legs[0].distance.text;    
      var duracion  = response.routes[0].legs[0].duration.text;
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        distance.innerHTML = "Distancia: " + distancia + "<br>Duración: " + duracion;
      }
    });
    canva.css('width','69%');
    dir.css('width', '31%');
  }

}

function resetMap(){
  var canva  = $('#map_canvas');
  var canva2 = $('#map_canvas2');  
  var dir = $('#directions_panel');
  var dis = $('#distance');
  var pano = $('#pano');
  $(m).each(function(d){
    this.setAnimation(null)
  })
  directionsDisplay.setMap(null);
  map.setZoom(4)
  map.setCenter(center)
  map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
  canva.css('width','100%');
  canva2.css('width','0%');
  dir.css('width','0%');
  dir.html('');
  dis.html('');
  pano.css('width','0%');

}



