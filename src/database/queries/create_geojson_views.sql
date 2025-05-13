create or replace view geojson_Measurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, ST_AsGeoJSON(area) as area from public."Measurement" m;

create or replace view geojson_TemperatureMeasurement as
	select m.measurement_type, m.id, m.device_id, m.timestamp, m.temp_c, ST_AsGeoJSON(area) as area from public."TemperatureMeasurement" m;

create or replace view geojson_FogLevelMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.density, ST_AsGeoJSON(area) as area from public."FogLevelMeasurement" m;

create or replace view geojson_WindMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.speed, m.direction, ST_AsGeoJSON(area) as area from public."WindMeasurement" m;

create or replace view geojson_AirQualityMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.no2, m.so2, m.o3, m.aqi, m.unit, m.humidity, ST_AsGeoJSON(area) as area from public."AirQualityMeasurement" m;

create or replace view geojson_AtmosphericPressureMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.unit, m.atm, ST_AsGeoJSON(area) as area from public."AtmosphericPressureMeasurement" m;

create or replace view geojson_CloudCovertMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.ccp, ST_AsGeoJSON(area) as area from public."CloudCovertMeasurement" m;
