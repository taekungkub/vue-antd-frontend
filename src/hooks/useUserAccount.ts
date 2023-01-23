import { reactive } from "vue";
import AuthServices from "../services/AuthServices";
import { LogTy } from "../types/LogTy";

const userAccountState = reactive({
  logList: <LogTy[]>[],
});

export default function useUserAccount() {
  const onGetLogs = async () => {
    try {
      const res = await AuthServices.profileLog();
      if (res) {
        userAccountState.logList = res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onGetLogs,
    userAccountState,
  };
}
