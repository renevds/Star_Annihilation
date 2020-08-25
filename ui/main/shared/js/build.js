var Build = (function() {
    var FALLBACK_ICON = 'coui://ui/main/game/live_game/img/build_bar/img_missing_unit.png';
    var pathWithoutExtensionMatch = /(.*)\.json[^\/]*$/;

    var iconForSpecId = function(id)
    {
        var match = null;
        if (id)
            match = pathWithoutExtensionMatch.exec(id);

        if (_.size(match) < 2)
            return FALLBACK_ICON;

        return 'coui:/' + match[1] + '_icon_buildbar.png';
    };

    var iconForUnit = function (unit)
    {
        if (!unit)
            return FALLBACK_ICON;
        return iconForSpecId(unit.id);
    };

    var HotkeyModel = function()
    {
        var self = this;

        self.SpecIdToGridMap = ko.observable(
          _.cloneDeep(HotkeyModel.SpecIdToGridMap));
    };

    // historical build bar is 3 x 6 using indexes 0 to 17
    // new build bar is flexible using row / column

    HotkeyModel.SpecIdToGridMap =
    {
        //general_buildings
        "/pa/units/land/control_module/control_module.json": ["utility", 1, {row: 0, column: 1}],
        "/pa/units/land/energy_plant_adv/energy_plant_adv.json": ["utility", 2, {row: 0, column: 2}],
        "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json": ["utility", 3, {row: 0, column: 3}],
        "/pa/units/land/radar/radar.json": ["utility", 4, {row: 1, column: 1}],
		"/pa/units/land/radar_adv/radar_adv.json": ["utility", 5, {row: 1, column: 2}],

        //resources
        "/pa/units/land/energy_plant/energy_plant.json": ["utility", 4, {row: 1, column: 3}],
        "/pa/units/land/metal_extractor/metal_extractor.json": ["utility", 5, {row: 1, column: 4}],
        "/pa/units/land/energy_storage/energy_storage.json": ["utility", 6, {row: 2, column: 3}],
        "/pa/units/land/metal_storage/metal_storage.json": ["utility", 7, {row: 2, column: 4}],

        //factories
        "/pa/units/air/air_factory_adv/air_factory_adv.json": ["factory", 1, {row: 1, column: 2}],
        "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json": ["factory", 2, {row: 1, column: 4}],

        "/pa/units/air/air_factory/air_factory.json": ["factory", 14, {row: 2, column: 2}],
        "/pa/units/land/vehicle_factory/vehicle_factory.json": ["factory", 16, {row: 2, column: 4}],

        //stationary defenses
        "/pa/units/land/laser_defense_single/laser_defense_single.json": ["combat", 17, {row: 2, column: 0}],

        //vehicles
        "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json": ["vehicle", 4, {row: 1, column: 0}],
        "/pa/units/land/tank_laser_adv/tank_laser_adv.json": ["vehicle", 3, {row: 1, column: 1}],

        "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json": ["vehicle", 2, {row: 0, column: 0}],
        "/pa/units/land/tank_hover/tank_hover.json": ["vehicle", 1, {row: 0, column: 1}],

        //air_orbital
        "/pa/units/air/bomber_adv/bomber_adv.json": ["air", 1, {row: 2, column: 1}],
        "/pa/units/air/fighter_adv/fighter_adv.json": ["air", 2, {row: 2, column: 0}],

        "/pa/units/orbital/mining_platform/mining_platform.json": ["orbital_structure", 13, {row: 2, column: 1}],
        "/pa/units/orbital/orbital_factory/orbital_factory.json": ["orbital_structure", 14, {row: 2, column: 2}],

        "/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json": ["air", 12, {row: 0, column: 0}],
        "/pa/units/orbital/orbital_fighter/orbital_fighter.json": ["air", 13, {row: 0, column: 1}]
    };

    return {
        iconForSpecId: iconForSpecId,
        iconForUnit: iconForUnit,
        HotkeyModel: HotkeyModel,
    };
})();

if (scene_mod_list['shared_build']) {
  loadMods(scene_mod_list['shared_build'])
}

// check for legacy indexes from mods

_.forEach( Build.HotkeyModel.SpecIdToGridMap, function(value, id)
{
    var size = value.length;
    var index = value[1];

    var row = Math.floor(index / 6);
    var column = column = index % 6

    if (size == 2)
    {
        var options =
        {
            row: row,
            column: column,
        }
        Build.HotkeyModel.SpecIdToGridMap[id].push(options);
        console.log('build.js old', index, row, column);
    }
})
