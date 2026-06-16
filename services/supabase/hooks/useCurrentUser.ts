import {useEffect, useState} from "react";
import {createClient} from "@/services/supabase/client";
import {User} from "@supabase/auth-js";

export function useCurrentUser() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({data: {user}}) => {
            setUser(user);
        }).finally(() => setIsLoading(false));

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        })

        return () => {
            data.subscription.unsubscribe();
        }
    }, []);



    return { user, isLoading };
}