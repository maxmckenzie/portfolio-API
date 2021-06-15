require('@babel/polyfill');
import express from 'express';
import fs from 'mz/fs';

import {
  getDetails,
  getProjects,
  getEducation,
  getSkills,
  getWorkHistory,
  getGithubCode
} from './scraper';

const app = express();

app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
});


app.get('/', express.static(process.cwd() + '/dist/', { index: 'data.json' }));

app.get('/scrape', async (req, res, next) => {
  const details = await getDetails();
  const projects = {} //await getProjects();
  const education = {} //await getEducation();
  const skills = {} //await getSkills();
  const workHistory = {} //await getWorkHistory();
  const githubCode = {} //await getGithubCode();

  const data = { details, projects, education, skills, workHistory, githubCode }

  console.log(data);

  await fs.writeFile(process.cwd() + '/dist/data.json', JSON.stringify(data), 'utf8');

  res.json(data);
  res.end();
});

app.listen(process.env.PORT || 5000, function () {
  console.log('listening at localhost:5000');
});
