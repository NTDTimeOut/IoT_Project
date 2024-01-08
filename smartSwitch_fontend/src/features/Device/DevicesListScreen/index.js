import ElectricalDevice from "features/Room/Component/ElectricalDevice";
import Lamp from "features/Room/Component/Lamp";
import Sensor from "features/Room/Component/Sensor";
import { thunkGetRoomsList } from "features/Room/roomSlice";
import BaseLayout from "general/components/BaseLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetDevicesListOfHome } from "../deviceSlice";
import "./style.scss";

DevicesListScreen.propTypes = {};

function DevicesListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentHome } = useSelector((state) => state?.home);
    const { devicesListOfHome, isGettingDevicesList } = useSelector(
        (state) => state?.device
    );

    useEffect(() => {
        document.title = "Trang danh sách thiết bị | Smart-Switch";
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetRoomsList({ homeId: currentHome._id }));
            await dispatch(
                thunkGetDevicesListOfHome({ homeId: currentHome._id })
            );
        };
        fetchData();
        return () => {};
    }, [currentHome._id]);

    return (
        <BaseLayout selected="devices-list">
            <div className="container-xxl">
                {isGettingDevicesList ? (
                    <div className="d-flex mt-15 justify-content-center align-items-center">
                        <div
                            className="spinner-border text-primary"
                            style={{ width: "3rem", height: "3rem" }}
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : devicesListOfHome.length > 0 ? (
                    <div className="rounded-lg">
                        <div className="row">
                            {devicesListOfHome?.filter(
                                (device) =>
                                    device.deviceType === "Nhiệt độ, độ ẩm" ||
                                    device.deviceType === "Cảm biến ánh sáng"
                            ).length > 0 && (
                                <Sensor
                                    hideRoomName={false}
                                    sensorsList={devicesListOfHome?.filter(
                                        (device) =>
                                            device.deviceType ===
                                                "Nhiệt độ, độ ẩm" ||
                                            device.deviceType ===
                                                "Cảm biến ánh sáng"
                                    )}
                                />
                            )}
                            {devicesListOfHome?.filter(
                                (device) =>
                                    device.deviceType === "Bóng đèn" ||
                                    device.deviceType === "Dải đèn" ||
                                    device.deviceType === "Đèn bàn" ||
                                    device.deviceType === "Đèn ngủ"
                            ).length > 0 && (
                                <Lamp
                                    hideRoomName={false}
                                    lampsList={devicesListOfHome?.filter(
                                        (device) =>
                                            device.deviceType === "Bóng đèn" ||
                                            device.deviceType === "Dải đèn" ||
                                            device.deviceType === "Đèn bàn" ||
                                            device.deviceType === "Đèn ngủ"
                                    )}
                                />
                            )}
                            

                            
                            {devicesListOfHome?.filter(
                                (device) =>
                                    device.deviceType === "Quạt"
                            ).length > 0 && (
                                <div className="col-12 col-md-6">
                                    <div className="d-flex flex-column my-5 p-2 border-1 bg-white shadow-sm rounded-xl">
                                        <div className="d-flex m-3">
                                            <div className=" me-1">
                                                Thiết bị điện
                                            </div>
                                        </div>
                                        <div className="row">
                                            {devicesListOfHome
                                                ?.filter(
                                                    (device) =>
                                                        device.deviceType ===
                                                            "Quạt"
                                                )
                                                .map((item) => (
                                                    <ElectricalDevice
                                                        key={item._id}
                                                        deviceItem={item}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center fs-16 mt-30 rounded bg-info text-white">
                        Chưa có thiết bị
                    </div>
                )}
            </div>
        </BaseLayout>
    );
}

export default DevicesListScreen;
