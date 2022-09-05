import adminStore from "@/store/ums/admin";

export default function useStore() {
    return {
        adminStore: adminStore()
    }
}
