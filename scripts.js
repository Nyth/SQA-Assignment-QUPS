import http from 'k6/http';
import { check, group } from 'k6';
import { Rate } from 'k6/metrics';

//const baseUrl = 'https://reqres.in/';
export let errorRate = new Rate('errors');

export let options = {
  vus: 50,
  stages: [
    { duration: '2s', target: 30 }, //30 terger will spam this url for 2 sec
    { duration: '3s', target: 50 }, // after that again it will ramp up and 5 users will hit the url for 30sec
    { duration: '1s', target: 0 }, // ramp down 0  user for for 1 sec
  ],
  thresholds: {
    checks: [
      { threshold: 'rate>0.9',
      errors: ['rate<0.2'] },//checks errors rate less than 20%
    ],
    http_req_duration: ['avg<50'],
  },
};

export default function () {
  group('JSON Placeholder Performance Testing', function () {
    group('Gets endpoint', function () {
      const res = http.get(`https://reqres.in/api/users/2`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
        'is status code 404': (r) => r.status === 404,
      });
    });
      group('Gets endpoint', function () {
        const res = http.get(`https://reqres.in/api/users/23`);
        check(res, {
          'is status code 200': (r) => r.status === 200,
          'is status code 404': (r) => r.status === 404,
        });
      });
      group('Gets endpoint', function () {
        const res = http.get(`https://reqres.in/api/users/23`);
        check(res, {
          'is status code 400': (r) => r.status === 400,
        });
      });
    group('Gets endpoint', function () {
      const res = http.get(`https://reqres.in/api/unknown/2`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
    group('Gets endpoint', function () {
      const res = http.get(`https://reqres.in/api/unknown/2`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
    group('Gets endpoint', function () {
      const res = http.get(`https://reqres.in/api/unknown/23`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
    group('Gets endpoint', function () {
      const res = http.get(`https://reqres.in/api/users?delay=3`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
    group('Posts endpoint', function () {
      const res = http.get(`https://reqres.in/api/register`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
        'is status code 400': (r) => r.status === 400,
      });
    });
    group('Posts endpoint', function () {
      const res = http.get(`https://reqres.in/api/users`);
      check(res, {
        'is status code 201': (r) => r.status === 201,
      });
    });
    group('Posts endpoint', function () {
      const res = http.get(`https://reqres.in/api/users/2`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
    group('Puts endpoint', function () {
      const res = http.get(`https://reqres.in/api/users/2`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
    group('Delete endpoint', function () {
      const res = http.get(`https://reqres.in/api/users/2`);
      check(res, {
        'is status code 204': (r) => r.status === 204,
      });
    });
    group('Patch endpoint', function () {
      const res = http.get(`https://reqres.in/api/users/2`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
    group('Posts endpoint', function () {
      const res = http.get(`https://reqres.in/api/login`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
        'is status code 400': (r) => r.status === 400,
      });
    });

    group('Gets endpoint ', function () {
      const res = http.get(`https://reqres.in/api/unknown/23`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
      errorRate.add(!res);
    });

  });

}


/*
//Post

//delete
http.get(`https://reqres.in/api/users/2`); //204
//patch
http.get(`https://reqres.in/api/users/2`);//200


}
*/
/*
//GET
http.get(`$baseUrl}/api/users?page=2`) ; //check 200
http.get(`${baseUrl}/api/users/23`);//404
http.get(`${baseUrl}/api/unknown/23`);//404
http.get(`${baseUrl}/api/users/2`);//200
http.get(`${baseUrl}/api/unknown`) ;//200
http.get(`${baseUrl}/api/unknown/2`) ;//200
http.get(`${baseUrl}/api/users?delay=3`) ;//200

//Post
http.get(`${baseUrl}/api/users`);//201
http.get(`${baseUrl}/api/register`); //r=200
http.get(`${baseUrl}/api/register`); //r=400
http.get(`${baseUrl}/api/login`); //200
http.get(`${baseUrl}/api/login`); //400
http.get(`${baseUrl}/api/users/2`);
//put
http.get(`${baseUrl}/api/users/2`);//200
//delete
http.get(`${baseUrl}/api/users/2`); //204
//patch
http.get(`${baseUrl}/api/users/2`);//200

*/











