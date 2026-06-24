import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import RoomCard from "@/components/RoomCard";

const RoomList = ({ title, rooms, isJoined }: {title: string, rooms:any, isJoined? : boolean}) => {
    if(rooms.length === 0) return null;

    return (
        <div className={'space-y-4 '}>
            <div className={'flex items-center justify-between gap-2'}>
                <h2 className={'text-2xl'}>{title}</h2>
                <Button asChild>
                    <Link href={'/rooms/new'}>Create Room</Link>
                </Button>
            </div>
            <div className={'grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'}>
                {
                    rooms.map((room) => (
                        <RoomCard {...room} key={room.id} isJoined={isJoined}/>
                    ))
                }
            </div>

        </div>
    );
};

export default RoomList;
