import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const useMeetingActions = () => {
    const router = useRouter();
    const client = useStreamVideoClient(); 

    const createInstantMeeting = async () => {
        if (!client) return;

        try {
            const id = crypto.randomUUID();
            const call = client.call("default", id);

            await call.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                    custom: {
                        description: "Instant Meeting",
                    }
                }
            });

        router.push(`/meeting/${call.id}`);
        toast.success("Meeting Created")
            
        } catch (error) {
            toast.error("Failed to Create a Meeting");
            
        }
    }

    const joinMeeting = (callId: string) => {
        if (!client) return toast.error("Failed To Join Meeting. Please Try Again")
        router.push(`/meeting/${callId}`);
    }

    return { createInstantMeeting, joinMeeting}
}


export default useMeetingActions;