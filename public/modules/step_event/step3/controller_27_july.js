/** 
Anguler Controller to manage look and feel 
Created : 2016-05-26
Created By: Deepak khokkar  
Module : Step 3 Event step  
*/
angular.module("google.places", []);
angular.module('alisthub', ['google.places']).controller('stepevent3Controller', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad,$stateParams, $state) {
    $scope.loader_div=$rootScope.loader_div=false;
     
     var $serviceTest = $injector.get("Lookservice");
    
     $scope.ticket_image=ticketImage;
     var href = window.location.href.split("/"); 
     $scope.preview_link="http://"+href[2]+"/preview_template/"+$localStorage.userId+"/"+$stateParams.eventId;
     var $serviceTestVenue = $injector.get("venues");
     $scope.error_message = true;
     $scope.site_url="http://"+href[2];
     $scope.backgroundImage="http://52.39.212.226:4004/images/bg/bg.png";
    var event_id=$scope.eventId=$stateParams.eventId;
    $rootScope.sociallink={};
    $serviceTest.getEventStep3({'event_id':event_id},function(resp){
       
       if(resp.result[0]==undefined)
       {
        $scope.mode='add';
        $serviceTestVenue.getEvent({'event_id':event_id},function(response){
        
        
        $scope.data1=response.results[0];
        
        $scope.title=response.results[0].title;
        $scope.content2=$sce.trustAsHtml(response.results[0].description);
        $scope.venue_name=response.results[0].venue_name;
        $scope.city=response.results[0].city;
        $scope.state=response.results[0].state;
        $scope.country=response.results[0].country;
        $scope.start_date=response.results[0].start_date;
        $scope.start_time=response.results[0].start_time;
        $scope.end_time=response.results[0].end_time;
        $scope.zipcode=response.results[0].zipcode;
        $rootScope.sociallink.facebook_url=response.results[0].facebook_url;
        $rootScope.sociallink.twitter_url=response.results[0].twitter_url;
        $scope.eventwebsite_url=response.results[0].website_url;
        $scope.video_url=response.results[0].video;
        $scope.inventory=response.results[0].inventory;
        var ages;
        if (response.results[0].custom_ages == null || response.results[0].custom_ages == 0) {
            ages = "All Ages";
        } else if (response.results[0].custom_ages == '18') {
            ages = "18 and  over";
        } else if (response.results[0].custom_ages == '19') {
            ages = "19 and  over";
        } else if (response.results[0].custom_ages == '21') {
            ages = '21 and over';
        } else {
            ages = response.results[0].custom_ages;
        }
        $scope.ages = ages;
        
        if(response.results[0].showclix_id!='')
              {
                 var ticket_html;
                 $serviceTest.getShowclixPriceLevel({"showclix_id":response.results[0].showclix_id},function(resp){
                     var str = "There is some problem on server. Please try after some time.";
                    function isJson(item) {
                      item = typeof item !== "string"
                          ? JSON.stringify(item)
                          : item;
                  
                      try {
                          item = JSON.parse(item);
                      } catch (e) {
                          return false;
                      }
                  
                      if (typeof item === "object" && item !== null) {
                          return true;
                      }
                  
                      return false;
                  }
                   if (isJson(resp.showclix)) {
                    if(resp.code==200)
                     {
                     
                 
                     ticket_html='<form class="mobile-tab" id="ticket-form" method="POST" action="https://tickets.alistixs.com/event/'+response.results[0].event_domain+'/"><div style="margin-top: 0px; display: none " id="select-tickets-fix" class="purchase_tickets  js-single-event"><div class="purchasetitle">Tickets</div></div><table cellspacing="0" cellpadding="0" border="0" id="ticket-selection-genad" class="formtab table"><tr><td colspan="4" class="panel-heading" align="left"><strong>Reserve Tickets</strong></td></tr>';
                     
                      var obj=$.parseJSON(resp.showclix);
                      $.each(obj, function(key, value) {
			
                         ticket_html+='<tr data-level-id="'+key+'"><td class="qty-td"> <select class="ticket-select input form-control" name="level['+key+']" id="select_level_'+key+'">';
                      for(var j=parseInt(value.increment_by);j<=parseInt(value.transaction_limit);j++)
                      {
                      ticket_html+='<option value="'+j+'">'+j+'</option>'; 
                      }
                      ticket_html+='</select></td><td class="level-td" colspan="2"><label for="select_level_'+key+'" style="margin-bottom:0px;"><span class="product_name">'+value.level+' <a title="Price Level Information" class="fe_price_level tb_level cboxElement" href="/level/'+key+'/description"></a><span></span></span></label></td><td class="price-td"><span>$'+value.price+'</span></td></tr>';
			});
                     ticket_html+='<tr><td colspan="4"><input type="submit" value="Get Tickets" class="custom_button " name="submit_ticket_request" id="submit_ticket_request"></td></tr></table></form>';
                     $scope.ticket_div=$sce.trustAsHtml(ticket_html);
                     }
                   }else{
                     $scope.ticket_div='';
                   }
                 });
		
              }
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {lat: response.results[0].latitude, lng: response.results[0].longitude}
      });
    
      var marker = new google.maps.Marker({
        position: {lat: response.results[0].latitude, lng: response.results[0].longitude},
        map: map 
       });
    marker.setMap(map);
		
    }); 
       }else{
       $scope.mode='edit';
      
      //  angular.element( document.querySelector( '#preview_div_contain_html' ) ).html(resp.result[0].html);
       }
       
    });
     




  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */

  
 $scope.click_menu = function(menu, data, valid) {
   
    var objectForm = this;
    $scope.selectedClass = 1;
    //To go to step1 event Details
    if (menu.id === 5) {
      if($stateParams.eventId!=undefined){
        $location.path("/create_event_step1/"+$stateParams.eventId);
      } else {
        $location.path("/create_event_step1");
      }
      
      $scope.selectedClass = 1;
    }

    ///TO move to price and level
    if (menu.id === 6) {
      if(objectForm.myForm!=undefined) {
        if (objectForm.myForm.$valid === true) {
            $scope.selectedClass = 2;
            if ($localStorage.eventId == null) {
              if(data != undefined) {
                if (data.eventtype=='single') {
                  if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
                    data.eventdate=$scope.single_start_date;
                    
                    data.startevent_time=$scope.startevent_time;
                    data.endevent_time=$scope.endevent_time;
                    
                    data.userId=$localStorage.userId;
                    $serviceTest.saveEvent(data,function(response){
                      if (response.code == 200) {
                        $scope.success=global_message.event_step1;
                        $localStorage.eventId = response.result;
                        $scope.error_message=false;
                        $timeout(function() {
                          $scope.success='';
                          $scope.error_message=true;
                        },3000);

                        console.log(response.result);
                        $location.path("/create_event_step2/"+$localStorage.eventId);
                        
                      }
                    });
                  }  
                } else {
                  data.userId=$localStorage.userId;
                  $serviceTest.saverecurringEvent({'data':data,'date':$scope.between_date},function(response){
                    if (response.code == 200) {
                      $scope.success=global_message.event_step1;
                      $scope.data={};
                      $scope.error_message=false;
                      $timeout(function() {
                       $scope.success='';
                       $scope.error_message=true;
                      },3000);
                      window.location.reload();
                    }
                  }); 
                }
              }
            } else {
              if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                $location.path("/create_event_step2/"+$stateParams.eventId);
              } else {
                $location.path("/create_event_step2/"+$localStorage.eventId);
              }
            }
        } else {
          $scope.selectedClass = 1;
          $scope.error_message = false;
          $scope.error = global_message.event_step1_msg;
          $timeout(function() {
            $scope.error = '';
            $scope.error_message = true;
            $scope.error = '';
          }, 3000);
        }
      } else {
        if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
          $location.path("/create_event_step2/"+$stateParams.eventId);
        } else {
          $location.path("/create_event_step2/"+$localStorage.eventId);
        }
      }
    }

    //look and feel div
    if (menu.id === 7) {
      if(objectForm.myForm1!=undefined) {
      if (objectForm.myForm1.$valid === true) {

        if(data != undefined) {
          data.eventId = $localStorage.eventId;
          $serviceTest.postSecondStepdata(data, function(response) {
            if (response.code == 200) {
              $scope.selectedClass = 3;
              if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
                $location.path("/create_event_step3/"+$stateParams.eventId);
              } else {
                $location.path("/create_event_step3/"+$localStorage.eventId);
              }      
            }
          });
        } else {
          $scope.selectedClass = 3;
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step3/"+$stateParams.eventId);
          } else {
            $location.path("/create_event_step3/"+$localStorage.eventId);
          } 
        }
      } else {
        $scope.selectedClass = 2;
        $scope.error_message = false;
        $scope.error = global_message.event_step2_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000); 
      }

        
      } else {
       
        $scope.selectedClass = 3;
        if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
          $location.path("/create_event_step3/"+$stateParams.eventId);
        } else {
          $location.path("/create_event_step3/"+$localStorage.eventId);
        } 

      }
    }

    //Event Setting div
    if (menu.id === 8) {
      $scope.selectedClass = 4;
      //if (objectForm.myForm.$valid === true) {
          if($stateParams.eventId!=undefined && $stateParams.eventId!='') {
            $location.path("/create_event_step4/"+$stateParams.eventId);
          } else {
            $location.path("/create_event_step4/"+$localStorage.eventId);
          }
     /* } else {

        $scope.error_message = false;
        $scope.error = global_message.event_step1_msg;
        $timeout(function() {
          $scope.error = '';
          $scope.error_message = true;
          $scope.error = '';
        }, 3000);
      }*/

    }
    //$scope.selected2 = menu;
  }

     //To get steps
  $scope.steps = [

    {
      "title": "Events Details",
      "icon": 'fa fa-calendar',
      'id': 5,
      "formname": 'myForm'
    }, {
      "title": "Price & Links",
      "icon": 'fa fa-tags',
      'id': 6,
      "formname": 'myForm'
    }, {
      "title": "Look & Feel",
      "icon": 'fa fa-eye',
      'id': 7,
      "formname": 'myForm1'
    }, {
      "title": "Setting",
      "icon": 'fa fa-cog',
      'id': 8,
      "formname": 'event-form'
    }

  ];
   $scope.selected2 = $scope.steps[2];
   $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };
    $scope.campaign_div=false;
    $scope.module_div=$scope.recipient_div=$scope.preview_div=$scope.image_div=$scope.block_div=true;
   if ($localStorage.userId!=undefined) {
      //To get venues of a user 
        $serviceTest.getlookAndFeel({},function(response){
            if (response!=null) {

            if (response.code == 200)
            {
              $scope.templates=response.result;
            }

            }else{
             $scope.templates=[];   
            }
            $rootScope.loader_div=true;
        });
    }
   
    $scope.items = ['item1'];

    $scope.animationsEnabled = true;  
    $scope.look_and_feel_step = [
    { "name": "Template",'id':1},
    {"name": "Design",'id':2},
    {"name": "Preview",'id':4}
  ]
    
    $scope.look_and_feel_choose_type = [
    { "name": "Color",'id':5},
    /*{"name": "Images",'id':6},*/
    {"name": "Blocks",'id':7}
   
  ]
    
    $scope.selected=$scope.look_and_feel_step[0];
    $scope.selected1=$scope.look_and_feel_choose_type[0];
     $scope.select1= function(item1) {
    if (item1.id==5) {
      
      $scope.color_div=false;
      $scope.image_div=$scope.block_div=true;  
    } else if (item1.id==6) {
      $scope.color_div=$scope.block_div=true;
      $scope.image_div=false;       
    }else if (item1.id==7) {
      $scope.color_div=$scope.image_div=true;
      $scope.block_div=false;       
    }
    $scope.selected1 = item1; 
  };
   $scope.isActive1 = function(item1) {
    return $scope.selected1 === item1;
  };
     $scope.select= function(item) {
    if (item.id==1) {
      
      $scope.module_div=$scope.preview_div=true;
      $scope.campaign_div=false;  
    } else if (item.id==2) {
     $scope.module_div=false;
      $scope.campaign_div=$scope.preview_div=true;       
    }
   
    else if (item.id==4) {
     $scope.preview_div=false;
      $scope.campaign_div=$scope.module_div=true;       
    }
    $scope.selected = item; 
  };


  $scope.isActive = function(item) {
    return $scope.selected === item;
  };
   
    $scope.preview_btn=function($index,size)
    {
       $rootScope.templateId=$index;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'previewtemplate.html',
            controller: 'PreviewTemplateCtrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });
    }
    
    $scope.socialLink=function(size)
    {
      $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'socialLinktemplate.html',
            controller: 'socialLinkCtrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });  
    }
   
  
    
    $scope.select_btn=function(index)
    {
         $serviceTest.getTemplate({'templateId':index},function(response){
            if (response!=null) {

            if (response.code == 200)
            {
               $scope.look_and_feel_description=response.result[0].description;
               
               $scope.desc=$sce.trustAsHtml($scope.look_and_feel_description);
               
               $scope.module_div=false;
               $scope.campaign_div=true;
               $scope.selected=$scope.look_and_feel_step[1];
            }

            }else{
               $scope.look_and_feel_description=[];   
            }
            
        });
       
    }
    
    $scope.$watch('backgroundColor', function(newValue, oldValue) {
             
             $scope.background_outer=newValue;
             
            
        });
    $scope.$watch('InnerbackgroundColor', function(newValue, oldValue) {
            
             $scope.background_inner=newValue;
              $timeout(function() {
              angular.element('#selectorBackground').triggerHandler('click');
             }, 100);
        }); 
    $scope.$watch('TextColor', function(newValue, oldValue) {
             
             if (oldValue==undefined) {
              $scope.text_color='#000'; 
             }else{
             $scope.text_color=newValue;
             }
             $timeout(function() {
              angular.element('#selectorTextColor').triggerHandler('click');
             }, 100);
        });
    $scope.$watch('OuterborderColor', function(newValue, oldValue) {
            
             $scope.border_outer=newValue;
        });
    $scope.$watch('InnerborderColor', function(newValue, oldValue) {
            $scope.border_color="solid 1px "+newValue;
        });
    
     /* Encode Image to base64 URL */
        $scope.encodeImageFileAsURL = function() {
            var filesSelected = document.getElementById("inputFileToLoad").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    $scope.image =newImage.src = srcData;
                    var eventId=$localStorage.eventId;
                      $serviceTest.addlookAndFeelImage({'imagedata':$scope.image,'eventId':eventId},function(response){
                        
                            if (response!=null) {
                
                            if (response.code == 200)
                            {
                             
                             if (response.result.insertId!='') {
                                var myEl = angular.element( document.querySelector( '#imgTest' ) );
                                myEl.prepend('<li>'+newImage.outerHTML+'</li>');
                             }
                            }
                
                            }
                            
                        });
                    

                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }
        
        $scope.banner_image='http://'+href[2]+'/images/img/f-img-o.jpg';
        $scope.section2_image='http://'+href[2]+'/images/img/s-img-o.jpg';
        $scope.section3_image='http://'+href[2]+'/images/img/s-img-o.jpg';
        $scope.changeImage=function()
        {
          $scope.backgroundImage=angular.element('#backgroundImage').val(); 
        }
         $scope.encodeImageFileAsURL1 = function() {
            var filesSelected = document.getElementById("my_file").files;
            console.log(filesSelected);
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    $scope.image =newImage.src = srcData;
                    var eventId=$localStorage.eventId;
                      $serviceTest.addlookAndFeelImage({'imagedata':$scope.image,'eventId':eventId},function(response){
                        
                            if (response!=null) {
                
                            if (response.code == 200)
                            {
                             
                             if (response.result.insertId!='') {
                                 $scope.banner_image1=$scope.image;
                                 $scope.select_image_val='banner_image';
                                  $timeout(function() {
                                  angular.element('#editImagePreview').click();   
                                  },500);
                             }
                            }
                
                            }
                            
                        });
                    

                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }
        
       
        $scope.encodeImageFileAsURL2 = function() {
            var filesSelected = document.getElementById("my_file2").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    $scope.image =newImage.src = srcData;
                    var eventId=$localStorage.eventId;
                      $serviceTest.addlookAndFeelImage({'imagedata':$scope.image,'eventId':eventId},function(response){
                        
                            if (response!=null) {
                
                            if (response.code == 200)
                            {
                             
                             if (response.result.insertId!='') {
                                $scope.banner_image1=$scope.image;
                                 $scope.select_image_val='backgroundImage';
                                  $timeout(function() {
                                  angular.element('#editImagePreview').click();   
                                  },500);
                             }
                            }
                
                            }
                            
                        });
                    

                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }
        
        
        $scope.encodeImageFileAsURL3 = function() {
            var filesSelected = document.getElementById("my_file3").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    $scope.image =newImage.src = srcData;
                    var eventId=$localStorage.eventId;
                      $serviceTest.addlookAndFeelImage({'imagedata':$scope.image,'eventId':eventId},function(response){
                        
                            if (response!=null) {
                
                            if (response.code == 200)
                            {
                             
                             if (response.result.insertId!='') {
                                
                                $scope.banner_image1=$scope.image;
                                 $scope.select_image_val='section3_image';
                                  $timeout(function() {
                                  angular.element('#editImagePreview').click();   
                                  },500);
                             }
                            }
                
                            }
                            
                        });
                    

                }
                fileReader.readAsDataURL(fileToLoad);
            }
        }

    $scope.data = {};
  $scope.locations =[];
  $scope.locations[0] =[];
    
});
angular.module('alisthub').controller('PreviewTemplateCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout) {
    var $serviceTest = $injector.get("Lookservice");
    var templateId=$rootScope.templateId;
    $serviceTest.getpreviewImage({'templateId':templateId},function(response){
       if (response.code==200) {
        $scope.preview_image=response.result[0].preview_image;
       }
    });
     $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});

angular.module('alisthub').controller('socialLinkCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout,$stateParams, $state) {
    var $serviceTest = $injector.get("Lookservice");
    var event_id=$stateParams.eventId;
     $scope.items = items;
     $scope.selected = {
      item: $scope.items[0]
     };
    $scope.updatesociallink=function(sociallink)
    {
         
        $serviceTest.updatesociallink({'eventId':event_id,'social_link':sociallink},function(response){
           if (response.code=='200') {
            $rootScope.sociallink=sociallink;
           }
        });
      $uibModalInstance.close($scope.selected.item);  
    }
   
     $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});

angular.module('alisthub').filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){	
    return $sce.trustAsHtml(htmlCode);
  } 
}]);
