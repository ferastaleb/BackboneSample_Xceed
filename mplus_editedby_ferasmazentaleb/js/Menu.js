XceedMeetingPlus.module('Menu', function (Menu, App, Backbone, Marionette, $) {

    Menu.home_menu = Backbone.Marionette.ItemView.extend({
        template: '#home-menu',
        tagName: 'div' //,
        //events: { 'click a':'main_menu_clicked' }
		
    });

	// BEGIN BLOCK FROM FERAS MAZEN TALEB 'taleb.feras@gmail.com'
	// Load main menu items from json 	
		Menu.DynamicLoadedMenuLayout = Backbone.Marionette.Layout.extend({
			template:'#main-menu',
			regions:{ UpperMenu: '#UpperMenu'},
			initialize: function(){ },
			events: { "click .sub": "showMenu2" },
			showMenu2: function(e){
				App.main_menu.show(new App.Menu.workspace_menu());
				},
			onRender: function(){
					var data = new Menu.MainMenuModelCollection();
					data.fetch();
					this.UpperMenu.show(new Menu.MainMenuCollectionView({collection: data}));
			}
		});
		
		Menu.MainMenuItemView = Backbone.Marionette.CompositeView.extend({ template: '#mainmenuitem-view' });
		Menu.MainMenuCollectionView = Backbone.Marionette.CollectionView.extend({ itemView: Menu.MainMenuItemView });
		
		Menu.MainMenuModel = Backbone.Model.extend();
		Menu.MainMenuModelCollection = Backbone.Collection.extend({ 
				model: Menu.MainMenuModel,
				url: function() { return 'jsons/main_menu.json'},
				parse: function(response){return response; },
				error:function(response,responseText){ alert('error..: ' + responseText); }
		});	
	// END BLOCK

	/*Menu.main_menu = Backbone.Marionette.Layout.extend({
			template: '#main-menu',
			regions: { UpperMenu: '#UpperMenu' },
			//events: { "click .TaskHeader": "showTask" },
			onRender: function(){  this.UpperMenu.show(new Menu.home_menu()) }
	});*/
	

    
	Menu.main_menu = Backbone.Marionette.ItemView.extend({ 
		template: '#home-menu',
		events: { "click .sub": "showMenu2" },
		showMenu2: function(e){
			App.main_menu.show(new App.Menu.workspace_menu());
		 }
	});
	
	Menu.workspace_menu = Backbone.Marionette.ItemView.extend({ 
		template: '#workspace-menu',
		events: { "click .sub": "showMenu3", "click .back": "showMenu" },
		showMenu: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.main_menu());
		 },
		showMenu3: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.workspace_menu2());
		 }
	});
	
	Menu.workspace_menu2 = Backbone.Marionette.ItemView.extend({ 
		template: '#workspace-menu2',
		events: { "click .back": "showMenu" },
		showMenu: function(e){
			e.preventDefault();
			App.main_menu.show(new App.Menu.workspace_menu());
		 }
	});
	
	Menu.EmptyMenuItem = Backbone.Marionette.ItemView.extend({ template: "#empty-view" });
	
	Menu.MainMenuItem = Backbone.Model.extend({});
    Menu.MainMenu = Backbone.Collection.extend({ model: Menu.MainMenuItem });

    App.vent.on('MainMenu:selectMainItem', function (id) {
        $('#MainMenu a').removeClass("selected");
		$("#"+id).addClass("selected");
    });

});
