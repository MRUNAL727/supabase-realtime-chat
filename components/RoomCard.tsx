import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import JoinRoomButton from "@/components/JoinRoomButton";
import LeaveRoomButton from "@/components/ui/LeaveRoomButton";

const RoomCard = ({ id, name, memberCount, isJoined}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{memberCount} members</CardDescription>
            </CardHeader>
            <CardFooter className={'gap-2'}>
                <>
                    {
                        isJoined ? (
                            <>
                                <Button asChild className={'grow '}>
                                    <Link href={`/rooms/${id}`}>Enter</Link>
                                </Button>
                                <LeaveRoomButton roomId={id} size={'sm'} variant={'destructive'}>
                                    Leave
                                </LeaveRoomButton>
                            </>
                        ):(
                            <>
                                <JoinRoomButton roomId={id} variant={'outline'} className={'grow'} size={'sm'}>Join</JoinRoomButton>
                            </>
                        )
                    }

                </>

            </CardFooter>
        </Card>
    );
};

export default RoomCard;
