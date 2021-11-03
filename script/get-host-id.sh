prefix="ID: "
docker_id_string=`docker info | grep ID:` 
docker_id_string=`echo $docker_id_string` #dont ask why i need this, this is dark magic

# # echo ${IN}
# # arrIN=(${IN//'ID: '/})
# HOST_ID=`echo $docker_id_string | cut -d"$prefix" -f2`
# HOST_ID=`echo "$docker_id_string" | sed -e "s/^$prefix//"`
# # arrIN=${IN#"$ID:"}
# # echo ${string}
# # echo ${prefix}
HOST_ID=${docker_id_string#$prefix}
echo HOST ID is \<${HOST_ID}\> now in environment variable HOST_UUID
echo "HOST_ID="$HOST_ID > .env_producer_host
# export HOST_UUID=${HOST_ID}


# # x=$(docker info | grep ID)
# # x=$(echo $x)
# # z="ID: "
# # y=${x#"$z"}
# # echo ${y}
