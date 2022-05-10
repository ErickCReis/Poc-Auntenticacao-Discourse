export function addLogInterceptor(instance, name) {
  instance.interceptors.response.use(
    function (response) {
      console.log(name, response.data);
      return response;
    },
    function (error) {
      console.error(name, error);
      return Promise.reject(error);
    }
  );
}
