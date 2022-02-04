duration=4

for file in hopper-merged walker2d-merged joined halfcheetah-speed;
# for file in joined;
do
	echo $file
	## print raw speed
	frames=$(ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 \
		images/${file}.mp4)
	echo 'frames:' $frames
	time=$(ffprobe -i images/${file}.mp4 -show_entries format=duration -v quiet -of csv="p=0")
	echo 'time:' $time

	# fps=$((frames / duration))
	# echo 'fps:' $fps
	mult=$(bc -l <<< "${duration} / ${time}")
	echo 'mult:', $mult

	ffmpeg -y -i images/${file}.mp4 -vf 'setpts='${mult}'*PTS' images/${file}-timed.mp4 > /dev/null 2>&1

	ffprobe -i images/${file}-timed.mp4 -show_entries format=duration -v quiet -of csv="p=0"

	echo
done