import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {MessagesSquareIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {createAdminClient} from "@/services/supabase/server";
import {getCurrentUser} from "@/services/supabase/lib/getCurrentUser";
import {redirect} from "next/navigation";
import RoomList from "@/components/RoomList";

export default async function Home() {
    const user = await getCurrentUser()

    if (user == null) {
        redirect('/auth/login')
    }
    const [publicRooms, joinedRooms] = await Promise.all([getPublicRooms(), getJoinedRooms(user?.id)])

    if (publicRooms.length === 0 && joinedRooms.length === 0) {
        return (
            <div className={'container mx-auto max-w-3xl px-4 py-8 space-y-8'}>
                <Empty className={'border border-dashed'}>
                    <EmptyHeader>
                        <EmptyMedia variant={'icon'}>
                            <MessagesSquareIcon/>
                        </EmptyMedia>
                        <EmptyTitle>No Chat Rooms</EmptyTitle>
                        <EmptyDescription>Create a new chat room to get started</EmptyDescription>
                    </EmptyHeader>

                    <EmptyContent>
                        <Button asChild>
                            <Link href={'rooms/new'}>Create Room</Link>
                        </Button>
                    </EmptyContent>
                </Empty>
            </div>
        );
    }
    return(
        <div className={'container mx-auto px-4 py-8 space-y-8'}>
                <RoomList title='Your Rooms' rooms={joinedRooms} isJoined />
                <RoomList title='Public Rooms' rooms={publicRooms.filter(
                    room => !joinedRooms.some(r => r.id === room.id)
                )} />
      </div>
    )
}

async function getPublicRooms()  {
     const supabase = await createAdminClient();

     const { data, error } = await supabase
         .from('chat_room')
         .select('id, name, chat_room_member (count)')
         .eq('is_public', true)
         .order('name', { ascending: true });

     if(error) {
         return []
     }

     return data.map((room) => ({
         id: room.id,
         name: room.name,
         memberCount: room.chat_room_member[0].count,
     }))
}

async function getJoinedRooms(userId: string)  {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
        .from('chat_room')
        .select('id, name, chat_room_member (member_id)')
        .order('name', { ascending: true });

    if(error) {
        return []
    }

    return data
        .filter(room => room.chat_room_member.some(u => u.member_id === userId))
            .map((room) => ({
        id: room.id,
        name: room.name,
        memberCount: room.chat_room_member.length
    }))
}