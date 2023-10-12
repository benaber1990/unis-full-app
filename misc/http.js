import axios from "axios";

function AxiosComp(hello) {
  axios.post(
    "https://unis-test-f6925-default-rtdb.europe-west1.firebasedatabase.app/newwww.json",
    {
      title: hello,
    }
  );
}

export default AxiosComp;
