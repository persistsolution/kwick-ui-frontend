
export const ThemeChanger = (value:any) => async (dispatch:any) => {
    dispatch({
        type: "ThemeChanger",
        payload: value
    });
  };

export const setFrId = (id: string | number) => ({
  type: "frId",
  payload: id,
});

