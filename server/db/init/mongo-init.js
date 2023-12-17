db = db.getSiblingDB('orgsdb');

db.createCollection('orgs');

db.orgs.insertMany([
  { name: 'WaterGardenInc', founded: '01/03/2010' },
  { name: 'ReantACar', founded: '01/10/2020' },
  { name: 'BestCleaners', founded: '12/06/2023' },
]);
