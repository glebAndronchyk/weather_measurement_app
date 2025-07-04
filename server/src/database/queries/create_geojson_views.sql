create or replace view geojson_Measurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, ST_AsGeoJSON(area)::jsonb as area, m.unit from public."Measurement" m;

create or replace view geojson_TemperatureMeasurement as
	select m.measurement_type, m.id, m.device_id, m.timestamp, m.temp_c, ST_AsGeoJSON(area)::jsonb as area, m.unit from public."TemperatureMeasurement" m;

create or replace view geojson_FogLevelMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.density, ST_AsGeoJSON(area)::jsonb as area, m.unit from public."FogLevelMeasurement" m;

create or replace view geojson_WindMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.speed, m.direction, ST_AsGeoJSON(area)::jsonb as area, m.unit from public."WindMeasurement" m;

create or replace view geojson_AirQualityMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.no2, m.so2, m.o3, m.aqi, m.humidity, ST_AsGeoJSON(area)::jsonb as area, m.unit from public."AirQualityMeasurement" m;

create or replace view geojson_AtmosphericPressureMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.atm, ST_AsGeoJSON(area)::jsonb as area, m.unit from public."AtmosphericPressureMeasurement" m;

create or replace view geojson_CloudCovertMeasurement as
	select  m.measurement_type, m.id, m.device_id, m.timestamp, m.ccp, ST_AsGeoJSON(area)::jsonb as area, m.unit from public."CloudCovertMeasurement" m;

create or replace view geojson_Location as
select  l.id, l.type, l.metadata, ST_AsGeoJSON(point)::jsonb as point from public."Location" l;
