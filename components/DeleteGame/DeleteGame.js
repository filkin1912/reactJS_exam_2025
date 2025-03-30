import { useParams } from "react-router-dom";

export const DeleteGame = (onGameDeleteSubmit) => {
    const { gameId } = useParams();

    onGameDeleteSubmit(gameId);

};