#import local.state_pb2
import os.path
import time
import glob

class State():

  def __init__(self):
    # All variables are set to None since they are unknown. The robot will
    # update them as needed.
    self.stopped = None
    self.rotating = None
    self.patrolling = None
    #self.navigation_path = local.state_pb2.NavigationPath()
    self.state_serialized_dir = '/home/pi/ThreeWheelBot/local/states'

  def add_path(self):
    navigation_command = self.navigation_path.all_commands.add()
    navigation_command.command_start_time.unix_timestamp_seconds = round(time.time())
    return navigation_command

  def load_nav_path(self):
    # Read the existing address book.
    try:
      most_recent_state_file = sorted([int(x.split('/')[-1].split(".")[0]) for x in glob.glob('/home/pi/ThreeWheelBot/local/states/*')], reverse=True)[0]
      most_recent_state_path = os.path.join(self.state_serialized_dir, str(most_recent_state_file) + ".textproto")
      f = open(most_recent_state_path, "rb")
      nav_path = self.navigation_path.ParseFromString(f.read())
      f.close()
    except IOError:
      print(self.state_serialized_dir + ": Could not open file.  Creating a new one.")
    return nav_path

  def save_navigation_path(self):
    # Write the new address book back to disk.
    most_recent_state_path = os.path.join(self.state_serialized_dir, str(round(time.time())) + ".textproto")
    f = open(most_recent_state_path, "wb")
    f.write(self.navigation_path.SerializeToString())
    f.close()
    return True
